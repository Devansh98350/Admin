
import { NextApiRequest, NextApiResponse } from 'next';
import { getChapterProgresses, createChapterProgress } from '../../../services/chapterProgressService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const progresses = await getChapterProgresses();
    res.status(200).json(progresses);
  } else if (req.method === 'POST') {
    const progress = await createChapterProgress(req.body);
    res.status(201).json(progress);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
