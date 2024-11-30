/* eslint-disable react/prop-types */
import { Box, Button, Container, Image } from "@chakra-ui/react";
import {
  faCircleMinus,
  faCirclePlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartProvider";

export const TemplateCarritoProduct = ({ funciones }) => {
  const { changeQuantityLess, changeQuantityMore, removeFromCart } = funciones;

  const { carrito } = useCart();
  return (
    <Container
      maxW={{ base: "100%", lg: "70%" }}
      mt="5"
      p="5"
      boxShadow="xl"
      bg="white"
      borderRadius="md"
    >
      {carrito.map((ele) => (
        <Box
          key={ele._id}
          border="1px solid #e2e8f0"
          borderRadius="md"
          mb={5}
          p={4}
          boxShadow="md"
        >
          <Box
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            gap={4}
          >
            <Box flexShrink={0}>
              <Image
                src={ele?.product?.images[0]?.secure_url}
                boxSize="120px"
                objectFit="cover"
                borderRadius="md"
              />
            </Box>

            <Box flex="1">
              <Box mb={2}>
                <Link to={`/product-details/${ele.product._id}`}>
                  <Box as="h2" fontWeight="bold" fontSize="lg" noOfLines={1}>
                    {ele.product.name}
                  </Box>
                </Link>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={2}>
                <Box as="span">Stock:</Box>
                <Box as="span" fontWeight="bold" color="green.500">
                  {ele.product.quantityMax}
                </Box>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={2}>
                <Box as="span">Precio:</Box>
                <Box as="span" fontWeight="bold" color="blue.500">
                  {ele.product.price}
                  {ele.product.coin === "soles" ? " S/" : " $"}
                </Box>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={4}>
                <Box as="span">Total:</Box>
                <Box as="span" fontWeight="bold" color="teal.600">
                  {ele.total}
                  {ele.product.coin === "soles" ? " S/" : " $"}
                </Box>
              </Box>
            </Box>

            <Box
              display="flex"
              flexDirection={{ base: "row", md: "column" }}
              justifyContent={{ base: "space-around", md: "space-between" }}
              alignItems="center"
            >
              <Button
                size="sm"
                isDisabled={ele.quantityItem >= ele.product.quantityMax}
                onClick={() => changeQuantityMore(ele._id)}
                variant="outline"
                colorScheme="blue"
              >
                <FontAwesomeIcon icon={faCirclePlus} />
              </Button>

              <Box as="span" fontWeight="bold" fontSize="lg">
                {ele.quantityItem}
              </Box>

              <Button
                size="sm"
                isDisabled={ele.quantityItem === 1}
                onClick={() => changeQuantityLess(ele._id)}
                variant="outline"
                colorScheme="red"
              >
                <FontAwesomeIcon icon={faCircleMinus} />
              </Button>
            </Box>

            <Box textAlign="center" mt={{ base: 3, md: 0 }}>
              <Button
                variant="outline"
                colorScheme="gray"
                size="sm"
                onClick={() => removeFromCart(ele._id)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
              <Link
                to={`/profile/pay/${ele._id}`}
                style={{ marginLeft: "10px" }}
              >
                <Button size="sm" colorScheme="green">
                  Ir a pagar
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      ))}
    </Container>
  );
};
