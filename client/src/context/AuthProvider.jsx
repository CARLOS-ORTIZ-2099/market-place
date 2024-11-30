/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import jsCookie from "js-cookie";
import {
  closeSessionApi,
  editProfileApi,
  loginApi,
  registerApi,
  verifyAuthApi,
} from "../api/auth";
import { useToast } from "@chakra-ui/react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [errorRegister, setErrorRegister] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const toast = useToast();

  useEffect(() => {
    verifyAuth();
  }, []);

  useEffect(() => {
    let timeLogin;
    if (errorLogin) {
      timeLogin = setTimeout(() => {
        setErrorLogin(null);
      }, 2000);
    }

    let timeRegister;
    if (errorRegister) {
      timeRegister = setTimeout(() => {
        setErrorRegister(null);
      }, 2000);
    }
    return () => {
      clearTimeout(timeLogin);
      clearTimeout(timeRegister);
    };
  }, [errorLogin, errorRegister]);

  const verifyAuth = async () => {
    const cookie = jsCookie.get("token-market");
    if (cookie) {
      setLoading(true);
      try {
        const response = await verifyAuthApi();
        setAuth(true);
        setUser(response.data.user);
      } catch (error) {
        toast({
          title: "error",
          description: "error inesperado al obtener tus credenciales",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handlerLogin = async (body) => {
    setLoadingLogin(true);
    try {
      const response = await loginApi(body);
      setAuth(true);
      setUser(response.data.user);
    } catch (error) {
      setErrorLogin(error.response.data);
    } finally {
      setLoadingLogin(false);
    }
  };

  const handlerRegister = async (body) => {
    setLoadingRegister(true);
    try {
      const response = await registerApi(body);
      //console.log(response);
      toast({
        title: "Cuenta Creada",
        description: "cuenta creada satisfactoriamente",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      return true;
    } catch (error) {
      setErrorRegister(error.response.data);
    } finally {
      setLoadingRegister(false);
    }
  };

  const handlerEditUser = async (id, body) => {
    setLoadingRegister(true);
    try {
      const response = await editProfileApi(id, body);
      //console.log(response);
      toast({
        title: "cuenta modificada",
        description: "cuenta actualizada satisfactoriamente",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setUser(response.data);
      return true;
    } catch (error) {
      setErrorRegister(error.response.data);
    } finally {
      setLoadingRegister(false);
    }
  };

  const handlerCloseSession = async () => {
    try {
      const { data } = await closeSessionApi();
      //console.log(data);
      setAuth(false);
      setUser(false);
    } catch (error) {
      toast({
        title: "error",
        description: "error inesperado",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const data = {
    auth,
    user,
    errorLogin,
    errorRegister,
    loading,
    loadingRegister,
    loadingLogin,
    handlerLogin,
    handlerCloseSession,
    handlerRegister,
    handlerEditUser,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  try {
    const auth = useContext(AuthContext);
    if (!auth) throw new Error("error exists");
    return auth;
  } catch (error) {
    console.log(error);
  }
};
