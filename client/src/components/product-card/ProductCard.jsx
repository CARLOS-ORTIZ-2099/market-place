/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
  return (
    <Box boxShadow="xl" rounded="md" bg="white">
      <Card maxW="sm">
        <CardBody>
          <Image
            src={product?.images?.[0].secure_url}
            alt="product"
            borderRadius="lg"
            height={"200px"}
            width={"300px"}
          />

          <Stack mt="6" spacing="3">
            <Heading textTransform={"capitalize"} size="md">
              {product.brand}
            </Heading>
            <Text textTransform={"capitalize"}>{product.name}</Text>
            <Text color="blue.600" fontSize="2xl">
              {product.coin === "soles" ? "S/" : "$"}
              {product.price}
            </Text>
          </Stack>
        </CardBody>

        <Divider />

        <CardFooter display={"flex"} justifyContent={"center"}>
          <Link to={`/product-details/${product._id}`}>
            <Button variant="solid" colorScheme="teal">
              see more
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </Box>
  );
};