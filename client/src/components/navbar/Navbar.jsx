import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { Box, Text, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  const { auth, user } = useAuth();

  return (
    <Box
      as="nav"
      mb="10"
      boxShadow="md"
      p="1rem"
      rounded="md"
      bg="white"
      position="sticky"
      top="0"
      zIndex="100"
    >
      <Flex
        as="ul"
        justify="space-around"
        align="center"
        listStyleType="none"
        textAlign="center"
      >
        <Box as="li" textAlign="center">
          <Link to="/">
            <Box as="div" role="button" textAlign="center">
              <FontAwesomeIcon
                icon={faHouse}
                style={{ color: "#2e7d8c" }}
                size="xl"
                aria-label="Inicio"
              />
              <Text
                fontWeight="bold"
                color="#2e7d8c"
                _hover={{ textDecoration: "underline" }}
                mt="0.5rem"
              >
                Home
              </Text>
            </Box>
          </Link>
        </Box>

        <Box as="li" textAlign="center">
          <Link to={auth ? "/profile/cart" : "/cart"}>
            <Box as="div" role="button" textAlign="center">
              <FontAwesomeIcon
                icon={faCartShopping}
                style={{ color: "#2e7d8c" }}
                size="xl"
                aria-label="Carrito"
              />
              <Text
                fontWeight="bold"
                color="#2e7d8c"
                _hover={{ textDecoration: "underline" }}
                mt="0.5rem"
              >
                Cart
              </Text>
            </Box>
          </Link>
        </Box>

        <Box as="li" textAlign="center">
          <Link to={auth ? "/profile" : "/login"}>
            <Box as="div" role="button" textAlign="center">
              <FontAwesomeIcon
                icon={faUser}
                style={{ color: "#2e7d8c" }}
                size="xl"
                aria-label="Perfil"
              />
              <Text
                fontWeight="bold"
                color="#2e7d8c"
                _hover={{ textDecoration: "underline" }}
                mt="0.5rem"
              >
                {user?.name || "Profile"}
              </Text>
            </Box>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};
