
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserProgresses, createUserProgress } from '../../../services/userProgressService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const progresses = await getUserProgresses();
    res.status(200).json(progresses);
  } else if (req.method === 'POST') {
    const progress = await createUserProgress(req.body);
    res.status(201).json(progress);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
