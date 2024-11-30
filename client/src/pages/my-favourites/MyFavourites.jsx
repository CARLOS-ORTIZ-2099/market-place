/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Box } from "@chakra-ui/react";
import { useFavourites } from "../../context/FavouritesProvider";
import { ProductCard } from "../../components/product-card/ProductCard";
import { Loading } from "../../components/loading/Loading";

export const MyFavourites = () => {
  const { auth } = useAuth();
  const { getAllUserFavourites } = useFavourites();
  const [infoFavourites, setInfoFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (auth) {
      getAllUserFavourites()
        .then((res) => {
          setInfoFavourites(res);
        })
        .catch((err) => setError(err.message))
        .finally(() => {
          setLoading(false);
        });
    }
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
      {infoFavourites.length > 0 ? (
        infoFavourites?.map(({ product }) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <Box color={"#2e7d8c"} fontWeight={"bold"}>
          no tienes favoritos
        </Box>
      )}
    </Box>
  );
};
