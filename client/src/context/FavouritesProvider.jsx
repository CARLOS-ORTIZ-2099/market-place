/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  addToFavouriteApi,
  getAllUserFavouritesApi,
  getAllUserFavouritesIdsApi,
} from "../api/favourites";
import { useAuth } from "./AuthProvider";
import { debounce } from "../libs/debounce";
import { useToast } from "@chakra-ui/react";

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const { auth } = useAuth();
  const [favourites, setFavourites] = useState([]);
  const toast = useToast();
  useEffect(() => {
    if (auth) {
      getAllUserFavouritesIds();
      return;
    }
    setFavourites([]);
  }, [auth]);

  const getAllUserFavouritesIds = async () => {
    try {
      const { status, data } = await getAllUserFavouritesIdsApi();
      if (status == "200") {
        setFavourites(data.favouritesFound);
      } else {
        throw new Error("error");
      }
    } catch (error) {
      toast({
        title: "error",
        description: "error al obtener tus favoritos",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const getAllUserFavourites = async () => {
    try {
      const { status, data } = await getAllUserFavouritesApi();
      if (status == "200") {
        //console.log(data);
        let favouritesRemain = [];
        for (let favourite of data.favouritesFound) {
          favouritesRemain.push(favourite.product._id);
        }
        setFavourites(favouritesRemain);
        return data.favouritesFound;
      } else {
        throw new Error("error inesperado");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleFavourite = async (boolean, idProduct) => {
    // console.log(boolean);
    if (!auth) {
      toast({
        title: "autenticacion",
        description: "logueate antes",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    } else if (boolean) {
      setFavourites((previous) => {
        const data = previous.filter((ele) => ele != idProduct);
        functionFavourite(idProduct, { action: "eliminar" });
        return data;
      });
    } else {
      setFavourites((previous) => {
        let data = [...previous, idProduct];
        functionFavourite(idProduct, { action: "crear" });
        return data;
      });
    }
  };

  /*  */
  const petition = (id, body) => {
    addToFavouriteApi(id, body)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  const functionFavourite = useCallback(debounce(petition, 500), []);

  const data = {
    favourites,
    getAllUserFavouritesIds,
    getAllUserFavourites,
    handleFavourite,
  };
  return (
    <FavouritesContext.Provider value={data}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  try {
    const favourites = useContext(FavouritesContext);
    if (!favourites) {
      throw new Error("error");
    }
    return favourites;
  } catch (error) {
    console.log(error);
  }
};
