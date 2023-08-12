// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import fsPromises from 'fs/promises';
import path from 'path'
import { Series } from '../../../../interfaces/Series';
import { Build } from '../../../../interfaces/Build';

const handler = async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
    // Route ID (Series)
    const { id } = req.query
    try {
        // Get Builds Data
        const filePath = path.join(process.cwd(), 'data.json');
        const jsonData = await fsPromises.readFile(filePath, 'utf-8');
        const allBuilds: Build[] = JSON.parse(jsonData);

        // Get all Series Data
        const seriesPath = path.join(process.cwd(), 'series.json');
        const seriesData = await fsPromises.readFile(seriesPath, 'utf-8');
        const listOfSeries: Series[] = JSON.parse(seriesData);

        // Get Specific Series
        const requestedSeries = listOfSeries.find(x => x.Id == id)

        if (requestedSeries !== undefined && requestedSeries !== null) {
            // Extract Data
            const data = allBuilds.filter(x => requestedSeries.Order.findIndex(y => y == x.Id) !== -1)

            res.status(200).json(data)
            return
        }
        res.status(404)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ name: 'Error reading data' })
    }
} 

export default handler;
