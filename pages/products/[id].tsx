import { GetServerSideProps, GetStaticPaths } from "next";
import { PageNotFoundError } from "next/dist/shared/lib/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Product = {
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
};
type Props = {
  product: Product;
};
function ProductPage({ product }: Props) {
  //   const router = useRouter();
  //   const id = router.query.id;
  //   const [product, setProduct] = useState<Product>();
  //   *!  Client Side Rendering
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       if (!id) return;
  //       const res = await fetch(`https://dummyjson.com/products/${id}`);
  //       const data = await res.json();
  //       console.log(data);
  //       setProduct(data);
  //     };
  //     fetchData();
  //   }, [id]);
  if (!product) return <div>Loading</div>;
  return (
    <div>
      <h1>{product.title}</h1>
      <h2>{product.description}</h2>
      <p>${product.price}</p>
    </div>
  );
}
export default ProductPage;
//  *!  Server Side Rendering

// export const getServerSideProps: GetServerSideProps<Props> = async (
//   context
// ) => {
//   const id = context?.params?.id;
//   const res = await fetch(`https://dummyjson.com/products/${id}`);
//   const data: Product = await res.json();
//   return {
//     props: {
//       product: data,
//     },
//   };
// };

//  *!  Incremental Static Regeneration  Rendering
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`https://dummyjson.com/products/`);
  const data = await res.json();
  const products: Product[] = data.products;

  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps: GetServerSideProps<Props> = async (context) => {
  const id = context?.params?.id;
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data: Product = await res.json();
  if (!data) {
  }
  return {
    props: {
      product: data,
    },
    // *! 
    revalidate:30,
  };
};
