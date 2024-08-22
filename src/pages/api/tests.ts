
import { NextApiRequest, NextApiResponse } from 'next';
import { getTests, createTest } from '../../services/testService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const tests = await getTests();
    res.status(200).json(tests);
  } else if (req.method === 'POST') {
    const test = await createTest(req.body);
    res.status(201).json(test);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
