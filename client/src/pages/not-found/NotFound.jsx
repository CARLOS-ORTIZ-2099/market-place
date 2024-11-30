import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <Box
      textAlign="center"
      py={10}
      px={6}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bg="gray.50"
    >
      <Heading
        display="inline-block"
        as="h1"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="xl" mt={3} color="gray.600">
        Página no encontrada
      </Text>
      <Text color="gray.500" mt={2}>
        Lo sentimos, la página que buscas no existe o fue movida.
      </Text>

      <Link to="/">
        <Button
          colorScheme="teal"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid"
          mt={6}
        >
          Volver al inicio
        </Button>
      </Link>
    </Box>
  );
}
