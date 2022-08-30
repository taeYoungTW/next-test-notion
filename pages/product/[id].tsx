import axios from 'axios';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const getStaticPaths = async () => {
    const paths = Array.from(Array(10).keys(), (i) => ({
        params: { id: `${i + 1}` },
    }));
    return {
        paths: paths,
        fallback: 'blocking',
    };
};

interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    initTime: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    let product;
    if (params?.id === undefined) {
        return { notFound: true };
    }
    try {
        product = await axios
            .get(`https://dummyjson.com/products/${params.id}`)
            .then((res) => res.data);
    } catch (error) {
        return { notFound: true };
    }
    return {
        props: {
            product: { ...product, initTime: new Date().toLocaleString() },
        },
    };
};

interface Props {
    product: IProduct;
}

const Post = ({ product }: Props) => {
    return (
        <div>
            <div>페이지 생성 시간 : {product.initTime}</div>
            <div>상품코드 : {product.id}</div>
            <Image
                src={product.thumbnail}
                width={300}
                height={300}
                alt={`${product.title} 이미지`}
            />
            <h1>상품명 : {product.title}</h1>
            <h2>설명: {product.description}</h2>
            <div>브랜드 : {product.brand}</div>
            <div>카테고리 : {product.category}</div>
            <div>할인 : {product.discountPercentage} %</div>
            <h2>가격 : {product.price}$</h2>
            <h3> 추천 : {product.rating}</h3>
            <Link href={'/'}>
                <button>
                    <a>Home으로 이동</a>
                </button>
            </Link>
        </div>
    );
};

export default Post;
