
import { NextApiRequest, NextApiResponse } from 'next';
import { getClasses, createClass } from '../../services/classService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const classes = await getClasses();
    res.status(200).json(classes);
  } else if (req.method === 'POST') {
    const cls = await createClass(req.body);
    res.status(201).json(cls);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
