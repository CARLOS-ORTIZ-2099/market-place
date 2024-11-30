import { useAuth } from "../../context/AuthProvider";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useFormAuth } from "../../hooks/useFormAuth";

const initial = { email: "", password: "" };

export const Login = () => {
  const { handlerLogin, errorLogin, loadingLogin } = useAuth();
  const { fields, handlerChange, validateErrors } = useFormAuth(initial);
  const toast = useToast();

  const sendData = (e) => {
    e.preventDefault();
    if (!validateErrors()) {
      return toast({
        title: "campos obligatorios",
        description: "todos los campos son obligatorios",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    handlerLogin(fields);
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      minH={"70vh"}
    >
      <Box w={{ base: "90%", sm: "450px" }}>
        <Text fontSize={{ base: "3xl", lg: "5xl" }}>Login</Text>

        <Box as="form" onSubmit={sendData} noValidate>
          <FormLabel>Email address</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="email"
            borderRadius={"18"}
            value={fields.email}
            onChange={handlerChange}
          />

          <FormLabel>password</FormLabel>
          <Input
            name="password"
            type="text"
            placeholder="password"
            borderRadius={"18"}
            value={fields.password}
            onChange={handlerChange}
          />

          <Button
            type="submit"
            colorScheme="teal"
            my={"5"}
            width={"100%"}
            borderRadius={"18"}
            isLoading={loadingLogin}
          >
            login
          </Button>
        </Box>

        {errorLogin?.message && (
          <Box mb={"2"} color={"tomato"}>
            {errorLogin.message}
          </Box>
        )}

        <Link to={"/register"}>no tienes una cuenta? registrate</Link>
      </Box>
    </Box>
  );
};
