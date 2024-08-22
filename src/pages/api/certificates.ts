
import { NextApiRequest, NextApiResponse } from 'next';
import { getCertificates, createCertificate } from '../../services/certificateService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const certificates = await getCertificates();
    res.status(200).json(certificates);
  } else if (req.method === 'POST') {
    const certificate = await createCertificate(req.body);
    res.status(201).json(certificate);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
