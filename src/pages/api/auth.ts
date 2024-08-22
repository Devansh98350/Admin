
import { NextApiRequest, NextApiResponse } from 'next';
import { login } from '../../services/authService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const authResponse = await login(req.body);
    if (authResponse) {
      res.status(200).json(authResponse);
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
