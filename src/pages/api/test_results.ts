
import { NextApiRequest, NextApiResponse } from 'next';
import { getTestResults, createTestResult } from '../../services/testResultService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const results = await getTestResults();
    res.status(200).json(results);
  } else if (req.method === 'POST') {
    const result = await createTestResult(req.body);
    res.status(201).json(result);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
