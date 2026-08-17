import fs from 'node:fs/promises';
import path from 'node:path';
import { createArchiveMonthlyDesignCover } from '@/lib/monthlyDesignCovers';

const FILE_PATTERN = /^(\d{4})_(\d{2})\.webp$/;
let archivePromise;

async function readArchive() {
  const archiveDirectory = path.join(process.cwd(), 'public', 'covers', 'archive');
  const filenames = await fs.readdir(archiveDirectory);

  return filenames
    .filter((filename) => FILE_PATTERN.test(filename))
    .sort((a, b) => a.localeCompare(b))
    .map((filename) => {
      const match = FILE_PATTERN.exec(filename);
      return createArchiveMonthlyDesignCover(match[1], match[2]);
    });
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    archivePromise ||= readArchive();
    const covers = await archivePromise;
    res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=86400');
    return res.status(200).json({ count: covers.length, covers });
  } catch (error) {
    archivePromise = undefined;
    return res.status(500).json({ error: 'Unable to read cover archive' });
  }
}
