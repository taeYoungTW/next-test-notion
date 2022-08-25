import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

export const getStaticPaths = async () => {
    return {
        paths: [],
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
}

export const getStaticProps = async ({ params }: { params: any }) => {
    const product: IProduct = await axios
        .get(`https://dummyjson.com/products/${params.id}`)
        .then((res) => res.data);
    return { props: { product } };
};

interface Props {
    product: IProduct;
}

const Post = ({ product }: Props) => {
    return (
        <div>
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