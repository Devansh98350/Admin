
import { NextApiRequest, NextApiResponse } from 'next';
import { getProfiles, createProfile } from '../../services/profileService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const profiles = await getProfiles();
    res.status(200).json(profiles);
  } else if (req.method === 'POST') {
    const profile = await createProfile(req.body);
    res.status(201).json(profile);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
