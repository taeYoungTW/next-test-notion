import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEvent, useEffect, useState } from 'react';
// import { revalidateGET } from '../services/revalidate';
import styles from '../styles/Home.module.css';

// export const getStaticProps: GetStaticProps = async (context) => {
//     const notion = new Client({
//         auth: process.env.NOTION_API_KEY,
//     });
//     const myDatabase = await notion.databases.query({
//         database_id: process.env.NOTION_DB_ID as string,
//     });
//     const database = myDatabase.results.map((page) => {
//         if (!('properties' in page)) return;
//         const { id, created_time: createdTime, properties, url } = page;
//         return {
//             id,
//             createdTime,
//             tag: properties['태그'],
//             name: properties['이름'],
//             url,
//         };
//     });

//     return {
//         props: { database },
//     };
// };

// interface HomeProps {
//     database: any[];
// }

const Home: NextPage = () => {
    const router = useRouter();
    const [database, setDatabase] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleClick = (e: MouseEvent, id: string) => {
        router.push({ pathname: '/posts/[id]', query: { id } });
    };

    // const handleRevalidateClick = async () => {
    //     try {
    //         await revalidateGET({});
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    useEffect(() => {
        (async () => {
            setIsLoading(true);

            // const res = await fetch('/api/notion');
            // const result = await res.json();

            await new Promise((resolve) => setTimeout(resolve, 200));
            setDatabase(Array.from(Array(2000).keys(), (i) => i + 1));
            setIsLoading(false);
        })();
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>Notion TEST</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Notion API TEST</h1>
                <div className={styles.description}>🧪 Develop Branch</div>
                <p className={styles.description}>
                    This API get my page of notion!
                </p>
                {/* <button onClick={handleRevalidateClick}>Revalidate Home</button> */}

                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div className={styles.grid}>
                        {database.map((value) => (
                            <div
                                className={styles.card}
                                key={value}
                                onClick={(e) => handleClick(e, value)}
                            >
                                <Link href={`/posts/${value}`}>
                                    <a> Comment : {value}</a>
                                </Link>
                            </div>
                        ))}
                        {/* {database?.map(
                            ({ id, createdTime, tag, name, url }) => {
                                return name?.title[0]?.text ? (
                                    <div
                                        key={id}
                                        className={styles.card}
                                        onClick={(e) => {
                                            handleClick(e, id);
                                        }}
                                    >
                                        <Link href={`/posts/${id}`}>Link</Link>
                                        <h1>{name?.title[0].text.content}</h1>
                                        <p>
                                            {new Date(
                                                createdTime
                                            ).toLocaleString('ko')}
                                        </p>
                                        <div
                                            style={{
                                                display: 'flex',
                                                gap: '10px',
                                                padding: '10px',
                                            }}
                                        >
                                            {tag.multi_select.map(
                                                (item: any) => (
                                                    <span
                                                        className={styles.tag}
                                                        style={{
                                                            backgroundColor:
                                                                item.color,
                                                            padding: '3px',
                                                            borderRadius: '2px',
                                                            color: 'black',
                                                        }}
                                                        key={item.id}
                                                    >
                                                        {item.name}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                ) : null;
                            }
                        )} */}
                    </div>
                )}
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            width={72}
                            height={16}
                        />
                    </span>
                </a>
            </footer>
        </div>
    );
};

export default Home;
