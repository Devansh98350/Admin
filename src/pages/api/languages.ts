
import { NextApiRequest, NextApiResponse } from 'next';
import { getLanguages, createLanguage } from '../../services/languageService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const languages = await getLanguages();
    res.status(200).json(languages);
  } else if (req.method === 'POST') {
    const language = await createLanguage(req.body);
    res.status(201).json(language);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
