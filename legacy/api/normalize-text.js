import { buildNormalizeTextSystemPrompt } from '../components/prompts/normalizeTextPrompt';
import { POSTCARD_QUOTE_MAX_CHARS } from '../../lib/postcardQuoteLimit';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const text = typeof req.body?.text === 'string' ? req.body.text : '';
  const input = text.trim();
  if (!input) return res.status(200).json({ output: '' });

  const maxLen = POSTCARD_QUOTE_MAX_CHARS;
  const system = buildNormalizeTextSystemPrompt({ maxLen });

  async function callOpenAI(userMessage) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error('OPENAI_API_KEY is not set');
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.7,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: userMessage },
        ],
      }),
    });

    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      const msg = data?.error?.message || 'OpenAI request failed';
      throw new Error(msg);
    }
    const out = data?.choices?.[0]?.message?.content;
    return typeof out === 'string' ? out : '';
  }

  function cleanOneLine(s) {
    return s.replace(/\s+/g, ' ').replace(/^[\s"'“”‘’]+|[\s"'“”‘’]+$/g, '').trim();
  }

  function sanitizeProfanity(s) {
    const t = String(s || '');
    // lightweight filter; final check is also enforced after model output
    return t
      .replace(/씨발|시발|ㅅㅂ|병신|ㅂㅅ|좆|존나|ㅈㄴ/gi, '')
      .replace(/fuck|shit|bitch|asshole/gi, '');
  }

  function enforceMaxLen(s) {
    const out = cleanOneLine(s);
    if (!out) return out;
    if (out.length > maxLen) return out.slice(0, maxLen).trimEnd();
    return out;
  }

  try {
    const cleanedInput = cleanOneLine(sanitizeProfanity(input));
    if (!cleanedInput) return res.status(200).json({ output: '' });

    // If already short enough, keep it as-is (max preserve).
    if (cleanedInput.length <= maxLen) {
      return res.status(200).json({ output: cleanedInput });
    }

    // Ask the model to fit range while preserving meaning (and filtering profanity).
    const msg = `원문: ${cleanedInput}\n\n조건: 원문 내용을 최대한 그대로 유지하면서, 공백 포함 ${maxLen}자 이하의 한국어 1문장으로 줄여줘. 욕설/비속어는 삭제 또는 순화. 새 내용 추가 금지.`;
    const raw = await callOpenAI(msg);
    const output = enforceMaxLen(sanitizeProfanity(raw));
    return res.status(200).json({ output: output || enforceMaxLen(cleanedInput) });
  } catch (e) {
    // API 실패 시: 욕설 필터 + 최대 길이만 강제
    const safe = enforceMaxLen(sanitizeProfanity(input.replace(/[\r\n]+/g, ' ')));
    return res.status(200).json({ output: safe, warning: String(e?.message || e) });
  }
}

