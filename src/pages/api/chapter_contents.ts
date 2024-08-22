
import { NextApiRequest, NextApiResponse } from 'next';
import { getChapterContents, createChapterContent } from '../../services/chapterContentService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const contents = await getChapterContents();
    res.status(200).json(contents);
  } else if (req.method === 'POST') {
    const content = await createChapterContent(req.body);
    res.status(201).json(content);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
