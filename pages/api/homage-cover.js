import { buildHomageCoverSvg } from '@/lib/homageCover';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end('Method not allowed');
  }

  const prompt = typeof req.query.prompt === 'string' ? req.query.prompt : '';
  const issue = typeof req.query.issue === 'string' ? req.query.issue : '277';
  const date = typeof req.query.date === 'string' ? req.query.date : '2001.07';
  const svg = buildHomageCoverSvg({ prompt, issue, date });

  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'private, max-age=0, must-revalidate');
  return res.status(200).send(svg);
}
