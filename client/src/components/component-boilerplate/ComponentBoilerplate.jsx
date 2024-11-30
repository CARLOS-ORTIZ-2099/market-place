/* eslint-disable react/prop-types */
import { Box, Flex, Text, Stack } from "@chakra-ui/react";

export const ComponentBoilerPlate = ({ product }) => {
  return (
    <Box
      border="1px solid"
      borderColor="gray.300"
      borderRadius="lg"
      p={6}
      boxShadow="md"
      bg="white"
    >
      <Box mb={4}>
        <Text
          as="h1"
          fontSize={{ base: "3xl", md: "6xl" }}
          fontWeight="bold"
          color="teal.500"
          textTransform={"capitalize"}
        >
          {product.name}
        </Text>
      </Box>

      <Box mb={4}>
        <Text fontSize="lg" color="gray.600" mb={1}>
          Descripción:
        </Text>
        <Text fontSize={{ base: "lg", md: "xl" }} color="gray.800">
          {product.description}
        </Text>
      </Box>

      <Stack spacing={3}>
        <Flex align="center">
          <Text fontWeight="semibold" color="gray.600" mr={2}>
            Stock disponible:
          </Text>
          <Text fontSize="lg" color="gray.800">
            {product.quantityMax}
          </Text>
        </Flex>

        <Flex align="center">
          <Text fontWeight="semibold" color="gray.600" mr={2}>
            Marca:
          </Text>
          <Text fontSize="lg" color="gray.800">
            {product.brand}
          </Text>
        </Flex>

        <Flex align="center">
          <Text fontWeight="semibold" color="gray.600" mr={2}>
            Categoría:
          </Text>
          <Text fontSize="lg" color="gray.800">
            {product.category}
          </Text>
        </Flex>

        <Flex align="center">
          <Text fontWeight="semibold" color="gray.600" mr={2}>
            Modo de envío:
          </Text>
          <Text fontSize="lg" color="gray.800">
            {product.deliveryMethod}
          </Text>
        </Flex>

        <Flex align="center">
          <Text fontWeight="semibold" color="gray.600" mr={2}>
            Estado:
          </Text>
          <Text fontSize="lg" color="gray.800">
            {product.state}
          </Text>
        </Flex>

        <Flex align="center">
          <Text fontWeight="semibold" color="gray.600" mr={2}>
            Garantía:
          </Text>
          <Text fontSize="lg" color="gray.800">
            {product.warranty}
          </Text>
        </Flex>

        <Flex align="center">
          <Text fontWeight="semibold" color="gray.600" mr={2}>
            Vendedor:
          </Text>
          <Text fontSize="lg" color="gray.800">
            {product.seller?.name} {product.seller?.lastName}
          </Text>
        </Flex>

        <Flex align="center">
          <Text fontWeight="semibold" color="gray.600" mr={2}>
            Precio:
          </Text>
          <Text fontSize="2xl" color="teal.600" fontWeight="bold">
            {product.coin === "soles" ? "S/" : "$"} {product.price || "0.00"}
          </Text>
        </Flex>
      </Stack>
    </Box>
  );
};
