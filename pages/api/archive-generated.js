import { Readable } from 'node:stream';
import { google } from 'googleapis';

/**
 * 생성 성공한 오마주 표지를 아카이빙한다:
 *  - Google Drive 업로드 — 파일명 "277호_2026_08_22_13:13" (호수 + KST 생성시각)
 *  - Google Sheets에 [이미지 이름, 프롬프트] 행 추가
 *
 * 필요한 환경 변수 (없으면 조용히 건너뛴다 — 생성 플로우를 막지 않는다):
 *  - GOOGLE_SHEETS_SERVICE_EMAIL / GOOGLE_SHEETS_PRIVATE_KEY  (서비스 계정)
 *  - GOOGLE_DRIVE_FOLDER_ID       (서비스 계정에 공유된 Drive 폴더)
 *  - GOOGLE_SHEETS_SPREADSHEET_ID (서비스 계정에 공유된 스프레드시트)
 *  - GOOGLE_SHEETS_GENERATED_SHEET (탭 이름, 기본 'generated')
 */

const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/spreadsheets',
];

// RunPod가 base64 데이터 URL을 돌려주는 경우가 있어 본문 한도를 넉넉히 잡는다.
export const config = { api: { bodyParser: { sizeLimit: '12mb' } } };

let authPromise = null;

function getAuth() {
  if (authPromise) return authPromise;
  const clientEmail = process.env.GOOGLE_SHEETS_SERVICE_EMAIL;
  const rawKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  if (!clientEmail || !rawKey) {
    authPromise = Promise.resolve(null);
    return authPromise;
  }
  // googleapis v171부터 위치 인자 시그니처가 조용히 실패한다 — 옵션 객체 필수.
  const auth = new google.auth.JWT({
    email: clientEmail,
    key: rawKey.replace(/\\n/g, '\n'),
    scopes: SCOPES,
  });
  authPromise = auth.authorize().then(() => auth).catch(() => null);
  return authPromise;
}

function isSameSiteRequest(req) {
  const fetchSite = String(req.headers['sec-fetch-site'] || '');
  if (fetchSite && !['same-origin', 'same-site', 'none'].includes(fetchSite)) return false;
  const origin = String(req.headers.origin || '');
  if (!origin) return true;
  try {
    const originHost = new URL(origin).host;
    const requestHost = String(req.headers['x-forwarded-host'] || req.headers.host || '');
    return Boolean(originHost && requestHost && originHost === requestHost);
  } catch {
    return false;
  }
}

/** "277호_2026_08_22_13:13" — KST 기준. */
export function buildArchiveName(issue, at = new Date()) {
  const kst = new Date(at.getTime() + 9 * 3600 * 1000);
  const pad = (n) => String(n).padStart(2, '0');
  const stamp = `${kst.getUTCFullYear()}_${pad(kst.getUTCMonth() + 1)}_${pad(kst.getUTCDate())}`
    + `_${pad(kst.getUTCHours())}:${pad(kst.getUTCMinutes())}`;
  const safeIssue = String(issue || '???').slice(0, 12);
  return `${safeIssue}호_${stamp}`;
}

async function readImage(imageUrl) {
  if (imageUrl.startsWith('data:')) {
    const match = /^data:([^;,]+)?(;base64)?,(.*)$/s.exec(imageUrl);
    if (!match) throw new Error('Invalid data URL');
    const mime = match[1] || 'image/png';
    const buffer = Buffer.from(decodeURIComponent(match[3]), match[2] ? 'base64' : 'utf8');
    return { buffer, mime };
  }
  const response = await fetch(imageUrl);
  if (!response.ok) throw new Error(`Image fetch failed: ${response.status}`);
  const mime = response.headers.get('content-type')?.split(';')[0] || 'image/png';
  return { buffer: Buffer.from(await response.arrayBuffer()), mime };
}

const EXTENSION_BY_MIME = {
  'image/png': 'png',
  'image/webp': 'webp',
  'image/jpeg': 'jpg',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!isSameSiteRequest(req)) return res.status(403).json({ error: 'Cross-site request' });

  const payload = req.body && typeof req.body === 'object' ? req.body : {};
  const imageUrl = typeof payload.imageUrl === 'string' ? payload.imageUrl.trim() : '';
  const issue = typeof payload.issue === 'string' || typeof payload.issue === 'number'
    ? String(payload.issue) : '';
  const prompt = typeof payload.prompt === 'string' ? payload.prompt.trim().slice(0, 500) : '';
  if (!imageUrl) return res.status(400).json({ error: 'imageUrl is required' });

  const auth = await getAuth();
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!auth || (!folderId && !spreadsheetId)) {
    return res.status(200).json({ archived: false, reason: 'not_configured' });
  }

  const name = buildArchiveName(issue);
  const result = { archived: true, name, drive: null, sheet: false };

  try {
    if (folderId) {
      const { buffer, mime } = await readImage(imageUrl);
      const extension = EXTENSION_BY_MIME[mime] || 'png';
      const drive = google.drive({ version: 'v3', auth });
      const created = await drive.files.create({
        requestBody: { name: `${name}.${extension}`, parents: [folderId] },
        media: { mimeType: mime, body: Readable.from(buffer) },
        fields: 'id',
        supportsAllDrives: true,
      });
      result.drive = created?.data?.id || null;
    }

    if (spreadsheetId) {
      const sheetName = process.env.GOOGLE_SHEETS_GENERATED_SHEET || 'generated';
      const sheets = google.sheets({ version: 'v4', auth });
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${sheetName}!A:B`,
        valueInputOption: 'RAW',
        requestBody: { values: [[name, prompt]] },
      });
      result.sheet = true;
    }

    return res.status(200).json(result);
  } catch (error) {
    // 아카이빙은 부가 기능 — 실패해도 관람객 플로우에 영향을 주지 않는다.
    return res.status(200).json({
      archived: false,
      reason: String(error?.message || error).slice(0, 200),
    });
  }
}
