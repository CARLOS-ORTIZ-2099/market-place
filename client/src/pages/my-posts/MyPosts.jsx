/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Box } from "@chakra-ui/react";
import { ProductCard } from "../../components/product-card/ProductCard";
import { Loading } from "../../components/loading/Loading";
import { useProduct } from "../../hooks/useProduct";

export const MyPosts = () => {
  const { user, auth } = useAuth();
  const { getAllProducts, products, error, loading } = useProduct(true);

  useEffect(() => {
    auth && getAllProducts(user._id);
  }, [auth]);

  if (loading) return <Loading />;

  if (error) return <h2>error inesperado</h2>;

  return (
    <Box
      display={"flex"}
      justifyContent={"space-around"}
      mt={"5"}
      gap={"5"}
      flexWrap={"wrap"}
    >
      {products.length > 0 ? (
        products.map((item) => <ProductCard key={item._id} product={item} />)
      ) : (
        <Box as="h3" color={"teal"} fontSize={"x-large"}>
          sin productos
        </Box>
      )}
    </Box>
  );
};
