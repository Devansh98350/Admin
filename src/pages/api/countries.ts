
import { NextApiRequest, NextApiResponse } from 'next';
import { getCountries, createCountry } from '../../services/countryService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const countries = await getCountries();
    res.status(200).json(countries);
  } else if (req.method === 'POST') {
    const country = await createCountry(req.body);
    res.status(201).json(country);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
