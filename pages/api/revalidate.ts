// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATE_KEY) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        const path = req.query.id ? `/posts/${req.query.id}` : '/';
        await res.revalidate(path);
        return res.json({ revalidated: true });
    } catch (err) {
        return res.status(500).send('Error revalidating');
    }
}
