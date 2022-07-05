import { Client } from '@notionhq/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const getStaticPaths = async () => {
    console.log('Run: getStaticPaths');
    const notion = new Client({
        auth: process.env.NOTION_API_KEY,
    });

    const myDatabase = await notion.databases.query({
        database_id: '3a28ac5f17214860a01d4af3b3c42dea',
    });
    const paths = myDatabase.results.map((page) => {
        if (!('properties' in page)) return;
        const { id, created_time: createdTime, properties, url } = page;
        return { params: { id } };
    });
    return {
        paths,
        fallback: 'blocking',
    };
};

export const getStaticProps = async ({ params }: { params: any }) => {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const post = await notion.blocks.children.list({
        block_id: params.id,
        page_size: 50,
    });
    const res = post.results.map((block: any) => ({
        text: block[block.type].rich_text[0].text.content,
    }));
    return { props: { post: res }, revalidate: 10 };
};

const Post = ({ post }: { post: any }) => {
    const router = useRouter();
    const { id } = router.query;
    return (
        <div>
            <h1>Page id: {id}</h1>
            {post.map(({ text }: any) => (
                <h3 key={text}>{text}</h3>
            ))}
        </div>
    );
};

export default Post;
