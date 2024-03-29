import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import styles from '../styles/Home.module.css';

const List: NextPage = () => {
    const { data } = useSWR<{
        products: { id: number; price: number; title: string }[];
    }>('ids', () =>
        axios
            .get('https://dummyjson.com/products?&select=title,price')
            .then((res) => res.data)
    );
    const router = useRouter();
    const [id, setId] = useState(1);
    return (
        <div className={styles.container}>
            <Head>
                <title>TEST : ISR COST</title>
                <meta name="description" content="TEST" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>TEST : ISR COST</h1>
                <div className={styles.description}>🧪 LIST</div>
                <input
                    type="number"
                    value={id}
                    onChange={(e) => {
                        const { value } = e.target;
                        setId(+value);
                    }}
                />
                <button onClick={() => router.push(`/product/${id}`)}>
                    custom button : {id}
                </button>
                <div className={styles.grid}>
                    {data
                        ? data?.products.map((product) => (
                              <div
                                  className={styles.card}
                                  key={product.id}
                                  onClick={() =>
                                      router.push(`/product/${product.id}`)
                                  }
                              >
                                  <div>ID : {product.id}</div>
                                  <Link href={`/product/${product.id}`}>
                                      <a>Title : {product.title}</a>
                                  </Link>
                                  <div>Price : {product.price}$</div>
                              </div>
                          ))
                        : 'loading...'}
                </div>
            </main>
        </div>
    );
};

export default List;
