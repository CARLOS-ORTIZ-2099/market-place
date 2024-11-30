/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from "../../context/AuthProvider";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormLabel,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useFormAuth } from "../../hooks/useFormAuth";
import { useEffect } from "react";
import { processFormdata } from "../../libs/processFormdata";
import { UploadAvatar } from "../../components/upload-avatar/UploadAvatar";
import { useUploadPhotos } from "../../hooks/useUploadPhotos";

const initial = { email: "", password: "", name: "", lastName: "" };

export const Register = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const {
    handlerRegister,
    handlerEditUser,
    errorRegister,
    user,
    auth,
    loadingRegister,
  } = useAuth();
  const { fields, handlerChange, handleSetFields, validateErrors } =
    useFormAuth(initial);
  const { photo, uploadPhotos } = useUploadPhotos();

  useEffect(() => {
    if (id && auth) {
      handleSetFields({
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        password: "",
        bio: user.bio || "",
      });
    }
  }, []);

  const sendData = async (e) => {
    e.preventDefault();
    if (id) {
      const newFormData = processFormdata(photo, toast, fields);
      if (!newFormData) return;
      const resp = await handlerEditUser(id, newFormData);
      //console.log(resp);
      if (resp) navigate("/profile");
      return;
    }
    if (!validateErrors()) {
      return toast({
        title: "campos obligatorios",
        description: "todos los campos son obligatorios",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    const resp = await handlerRegister(fields);
    //console.log(resp);
    resp && handleSetFields(initial);
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      minH={"70vh"}
    >
      <Box w={{ base: "90%", sm: "450px" }}>
        <Text fontSize={{ base: "3xl", lg: "5xl" }}>
          {id ? "editar" : "Registro"}
        </Text>

        <Box as="form" onSubmit={sendData} noValidate>
          {id && (
            <UploadAvatar
              uploadPhoto={uploadPhotos}
              image={photo}
              user={user}
            />
          )}

          <FormLabel>Email address</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="email"
            borderRadius={"18"}
            value={fields.email}
            onChange={handlerChange}
          />
          {errorRegister?.email && (
            <Text color={"tomato"} fontWeight={"bold"}>
              {errorRegister?.email}
            </Text>
          )}
          {errorRegister?.message && (
            <Text color={"tomato"} fontWeight={"bold"}>
              {errorRegister?.message}
            </Text>
          )}

          <FormLabel>password</FormLabel>
          <Input
            name="password"
            type="text"
            placeholder="password"
            borderRadius={"18"}
            value={fields.password}
            onChange={handlerChange}
          />
          {errorRegister?.password && (
            <Text color={"tomato"} fontWeight={"bold"}>
              {errorRegister?.password}
            </Text>
          )}

          <FormLabel>name</FormLabel>
          <Input
            name="name"
            type="text"
            placeholder="name"
            borderRadius={"18"}
            value={fields.name}
            onChange={handlerChange}
          />
          {errorRegister?.name && (
            <Text color={"tomato"} fontWeight={"bold"}>
              {errorRegister?.name}
            </Text>
          )}

          <FormLabel>lastName</FormLabel>
          <Input
            name="lastName"
            type="text"
            placeholder="lastName"
            borderRadius={"18"}
            value={fields.lastName}
            onChange={handlerChange}
          />
          {errorRegister?.lastName && (
            <Text color={"tomato"} fontWeight={"bold"}>
              {errorRegister?.lastName}
            </Text>
          )}

          {id && (
            <>
              <FormLabel>bio</FormLabel>
              <Textarea
                name="bio"
                placeholder="bio"
                resize={"none"}
                borderRadius={"18"}
                value={fields.bio}
                onChange={handlerChange}
              />
            </>
          )}

          <Button
            type="submit"
            colorScheme="teal"
            my={"5"}
            width={"100%"}
            borderRadius={"18"}
            isLoading={loadingRegister}
          >
            {id ? "editar" : "Registro"}
          </Button>
        </Box>

        {!id && <Link to={"/login"}>ya tienes una cuenta inicia sesion</Link>}
      </Box>
    </Box>
  );
};
