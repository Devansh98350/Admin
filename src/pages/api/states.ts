
import { NextApiRequest, NextApiResponse } from 'next';
import { getStates, createState } from '../../services/stateService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const states = await getStates();
    res.status(200).json(states);
  } else if (req.method === 'POST') {
    const state = await createState(req.body);
    res.status(201).json(state);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
