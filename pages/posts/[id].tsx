import { Client } from '@notionhq/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { revalidateGET } from '../../services/revalidate';

export const getStaticPaths = async () => {
    // const notion = new Client({
    //     auth: process.env.NOTION_API_KEY,
    // });

    // const myDatabase = await notion.databases.query({
    //     database_id: '3a28ac5f17214860a01d4af3b3c42dea',
    // });
    // const paths = myDatabase.results.map((page) => {
    //     if (!('properties' in page)) return;
    //     const { id, created_time: createdTime, properties, url } = page;
    //     return { params: { id } };
    // });

    const paths = Array.from(Array(1000).keys(), (i) => {
        return {
            params: { id: (i + 1).toString() },
        };
    });

    return {
        paths,
        fallback: 'blocking',
    };
};

export const getStaticProps = async ({ params }: { params: any }) => {
    // const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const res = await (async () => {
        try {
            // const post = await notion.blocks.children.list({
            //     block_id: params.id,
            //     page_size: 50,
            // });
            // const res = post.results.map((block: any) => ({
            //     text: block[block.type].rich_text[0].text.content,
            // }));
            const numberId = parseInt(params.id);
            const id = numberId > 500 ? numberId - 500 : numberId;
            const noCache = numberId > 500 ? `&t=1` : '';
            const result = await fetch(
                `https://jsonplaceholder.typicode.com/comments?id=${id}${noCache}`
            );
            const res = await result.json();
            return res.length === 0
                ? { props: { post: null }, notFound: true }
                : { props: { post: res[0] } };
        } catch (error) {
            return { props: { post: null }, notFound: true };
        }
    })();
    return res;
};

const Post = ({ post }: { post: any }) => {
    const router = useRouter();
    const { id } = router.query;
    const handleRevalidateClick = async () => {
        try {
            await revalidateGET({ id: id as string });
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <h1>{post.name}</h1>
            <h3>Page id: {id}</h3>
            <h4>{post.email}</h4>
            <div>{post.body}</div>
            <button onClick={handleRevalidateClick}>Revalidate</button>
            {/* {post.map(({ text }: any) => (
                <h3 key={text}>{text}</h3>
            ))} */}

            <Link href={'/'}>Home</Link>
        </div>
    );
};

export default Post;
