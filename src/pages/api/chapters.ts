
import { NextApiRequest, NextApiResponse } from 'next';
import { getChapters, createChapter } from '../../services/chapterService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const chapters = await getChapters();
    res.status(200).json(chapters);
  } else if (req.method === 'POST') {
    const chapter = await createChapter(req.body);
    res.status(201).json(chapter);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
