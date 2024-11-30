/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { ProductCard } from "../../components/product-card/ProductCard";
import { Loading } from "../../components/loading/Loading";
import { useProduct } from "../../hooks/useProduct";

export const Home = () => {
  const { getAllProducts, products, error, loading } = useProduct(true);

  useEffect(() => {
    getAllProducts();
  }, []);

  if (loading) return <Loading />;

  if (error) return <h2>error inesperado</h2>;

  return (
    <Flex
      align={"center"}
      justify={"space-around"}
      wrap={"wrap"}
      gap={"1.5rem"}
    >
      {products?.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <Box color={"#2e7d8c"} fontWeight={"bold"}>
          no hay productos aun, se el primero en publicar algo
        </Box>
      )}
    </Flex>
  );
};
