
// import { NextApiRequest, NextApiResponse } from 'next';
// // import { getUsers, createUser } from '../../../services/userService';
// import { getUsers, createUser } from '../../services/userService';
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     const users = await getUsers();
//     res.status(200).json(users);
//   } else if (req.method === 'POST') {
//     const user = await createUser(req.body);
//     res.status(201).json(user);
//   } else {
//     res.setHeader('Allow', ['GET', 'POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }


import { NextApiRequest, NextApiResponse } from 'next';
import { getUsers, createUser } from '../../services/userService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const users = await getUsers();
      res.status(200).json(users);
    } else if (req.method === 'POST') {
      const user = await createUser(req.body);
      res.status(201).json(user);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
