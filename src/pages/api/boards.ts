
import { NextApiRequest, NextApiResponse } from 'next';
import { getBoards, createBoard } from '../../services/boardService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const boards = await getBoards();
    res.status(200).json(boards);
  } else if (req.method === 'POST') {
    const board = await createBoard(req.body);
    res.status(201).json(board);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
