import { Client } from '@notionhq/client';
import { NextApiRequest, NextApiResponse } from 'next';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const notion = new Client({
            auth: process.env.NOTION_API_KEY,
        });
        const myDatabase = await notion.databases.query({
            database_id: process.env.NOTION_DB_ID as string,
        });
        const database = myDatabase.results.map((page) => {
            if (!('properties' in page)) return;
            const { id, created_time: createdTime, properties, url } = page;
            return {
                id,
                createdTime,
                tag: properties['태그'],
                name: properties['이름'],
                url,
            };
        });
        return res.json(database);
    } catch (error) {
        return res.status(500).send('Error notion');
    }
};
