
import { NextApiRequest, NextApiResponse } from 'next';
import { getSubjects, createSubject } from '../../services/subjectService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const subjects = await getSubjects();
    res.status(200).json(subjects);
  } else if (req.method === 'POST') {
    const subject = await createSubject(req.body);
    res.status(201).json(subject);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
