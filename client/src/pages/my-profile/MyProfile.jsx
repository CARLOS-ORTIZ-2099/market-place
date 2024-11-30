import { Avatar, Box, Button, Container, Text } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthProvider";
import { Link } from "react-router-dom";

export const MyProfile = () => {
  const { handlerCloseSession, user } = useAuth();
  const closeSession = () => handlerCloseSession();

  return (
    <Box bg={"whitesmoke"} minH={"100vh"}>
      <Container
        minH={"50vh"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <Text fontSize={{ base: "3xl", lg: "5xl" }} fontWeight={"bold"}>
          MyProfile
        </Text>

        <Text as="i">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quo
          mollitia magnam laboriosam quasi nesciunt qui fugiat est ut cupiditate
          doloremque rem iusto nisi nulla, repudiandae exercitationem porro.
          Velit, exercitationem!
        </Text>

        <Box mt={7}>
          <Avatar
            bg="teal.500"
            size="2xl"
            name={`${user.name} ${user.lastName}`}
            src={`${user?.avatar?.secure_url}`}
          />
        </Box>

        <Text my={4} as="cite">
          {user.name} {user.lastName} - {user.email}
        </Text>
        <Text my={4}>{user.bio}</Text>

        <Box display={"flex"} gap={"2rem"} flexWrap={"wrap"}>
          <Button
            onClick={closeSession}
            display={"block"}
            mx={"auto"}
            colorScheme="teal"
          >
            cerrar session
          </Button>

          <Link to={`/profile/editProfile/${user._id}`}>
            <Button display={"block"} mx={"auto"} colorScheme="teal">
              editar perfil
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};
