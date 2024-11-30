/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useCart } from "../../context/CartProvider";
import { Box, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartWhite } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { ComponentBoilerPlate } from "../component-boilerplate/ComponentBoilerplate";
import { useState } from "react";
import { useFavourites } from "../../context/FavouritesProvider";

export const ProductData = ({ product, deleteProduct }) => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const { addToCart, loading } = useCart();
  const { favourites, handleFavourite } = useFavourites();

  const changeQuantityMore = () =>
    setQuantity((previous) =>
      previous >= product.quantityMax ? previous : previous + 1
    );

  const changeQuantityLess = () =>
    setQuantity((previous) => (previous <= 1 ? previous : previous - 1));

  function buttonFavourite() {
    return favourites.find((fv) => fv == product._id) ? (
      <Button
        colorScheme="teal"
        variant="ghost"
        mt={"10"}
        onClick={() => handleFavourite(true, product._id)}
      >
        <FontAwesomeIcon icon={faHeart} style={{ color: "#2e7d8c" }} />
      </Button>
    ) : (
      product.seller._id !== user._id && (
        <Button
          colorScheme="teal"
          variant="ghost"
          mt={"10"}
          onClick={() => handleFavourite(false, product._id)}
        >
          <FontAwesomeIcon icon={heartWhite} />
        </Button>
      )
    );
  }

  return (
    <Box flex={"1 1 0"} textAlign={"center"}>
      <ComponentBoilerPlate product={product} />
      {buttonFavourite()}
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        gap={"1rem"}
        mt={"5"}
      >
        {product.seller._id === user._id ? (
          <>
            <Button
              onClick={() => deleteProduct(product._id)}
              colorScheme="red"
              size={{ base: "sm", lg: "md" }}
            >
              eliminar producto
            </Button>

            <Button colorScheme="blue" size={{ base: "sm", lg: "md" }}>
              <Link to={`/profile/formPage/${product._id}`}>
                editar producto
              </Link>
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={changeQuantityLess}
              colorScheme="teal"
              size={{ base: "md", lg: "md" }}
            >
              <FontAwesomeIcon icon={faMinus} />
            </Button>

            <Button
              size={{ base: "md", lg: "md" }}
              colorScheme="teal"
              variant="ghost"
            >
              {quantity}
            </Button>

            <Button
              onClick={changeQuantityMore}
              isDisabled={quantity >= product.quantityMax}
              colorScheme="teal"
              size={{ base: "md", lg: "md" }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>

            <Button
              onClick={() => addToCart(id, quantity, product.quantityMax)}
              isDisabled={loading || product.quantityMax === 0}
              colorScheme="teal"
            >
              {"agregar al carrito"}
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};
