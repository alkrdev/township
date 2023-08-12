// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import fsPromises from 'fs/promises';
import path from 'path'

const handler = async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const filePath = path.join(process.cwd(), 'series.json');
    const jsonData = await fsPromises.readFile(filePath, 'utf-8');
    const objectData = JSON.parse(jsonData);

    res.status(200).json(objectData)
  }
  catch (error) {
    console.log(error)
    res.status(500).json({ name: 'Error reading data' })
  }
} 

export default handler;
