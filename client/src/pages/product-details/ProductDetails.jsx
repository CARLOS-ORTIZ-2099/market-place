/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductGallery } from "../../components/product-gallery/ProductGallery";
import { Container } from "@chakra-ui/react";
import { Loading } from "../../components/loading/Loading";
import { ProductData } from "../../components/product-data/ProductData";
import { useProduct } from "../../hooks/useProduct";

export const ProductDetails = () => {
  const { id } = useParams();

  const { getOneProduct, deleteProduct, product, error, loading } =
    useProduct(true);

  useEffect(() => {
    getOneProduct(id);
  }, [id]);

  if (loading) return <Loading />;

  if (error) return <h2>error inesperado</h2>;

  return (
    <Container
      maxW={{ base: "100%" }}
      display={"flex"}
      flexDirection={{ base: "column", lg: "row" }}
      p={{ base: "1", lg: "10" }}
      flexWrap={"wrap"}
    >
      <ProductGallery images={product?.images} />

      <ProductData product={product} deleteProduct={deleteProduct} />
    </Container>
  );
};
