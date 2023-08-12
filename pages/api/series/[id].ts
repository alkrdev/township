// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import fsPromises from 'fs/promises';
import path from 'path'

const handler = async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { id } = req.query
    try {
        const number = Number(id)
        const filePath = path.join(process.cwd(), 'series.json');
        const jsonData = await fsPromises.readFile(filePath, 'utf-8');
        const objectData = JSON.parse(jsonData);
        const requestSeries = objectData[number]

        res.status(200).json(requestSeries)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ name: 'Error reading data' })
    }
} 

export default handler;
