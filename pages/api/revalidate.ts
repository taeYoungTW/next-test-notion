import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
    if (req.query.secret !== process.env.NOTION_DB_ID) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        await res.revalidate(`/product/${req.query.id}`);
        return res.json({ revalidated: true });
    } catch (err) {
        return res.status(500).send('Error revalidating');
    }
};

export default handler;
