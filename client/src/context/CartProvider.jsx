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
import { useAuth } from "./AuthProvider";
import {
  addToCartApi,
  buyTheOrderApi,
  getCartApi,
  removeFromCartApi,
  updateCartApi,
} from "../api/cart";
import { debounce } from "../libs/debounce";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { auth } = useAuth();
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth) {
      getCart();
      return;
    }
    setCarrito([]);
  }, [auth]);

  const getCart = async () => {
    try {
      const { data, status } = await getCartApi();
      if (status != "200") {
        throw new Error("error inesperado");
      }
      if (data.shouldUpdatedCart) {
        toast({
          title: "actualizacion",
          description:
            "mientras navegabas uno a mas productos de tu carrito sufrieron algunos cambios de precio y/o stock",
          status: "info",
          duration: 2000,
          isClosable: true,
        });
      }
      setCarrito(data.cart);
    } catch (error) {
      toast({
        title: "error",
        description: "sucedio un error inesperado al obtener tus datos",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const addToCart = async (id, quantity, stock) => {
    if (auth) {
      const itemFound = carrito.find((item) => item.product?._id == id);
      if (itemFound && itemFound.quantityItem + quantity > stock) {
        toast({
          title: "sin stock",
          description: "no puedes agregar mas",
          status: "info",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
      setLoading(true);
      try {
        const { data, status } = await addToCartApi(id, quantity);
        if (status == "201") {
          setCarrito((previous) => [...previous, data.item]);
          toast({
            title: "agregado",
            description: "agregado al carrito",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        } else if (status == "200") {
          setCarrito((previous) =>
            previous.map((product) =>
              product._id == data.item._id
                ? {
                    ...product,
                    quantityItem: data.item.quantityItem,
                    total: data.item.total,
                  }
                : product
            )
          );
          toast({
            title: "agregado",
            description: "agregado al carrito",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        } else {
          throw new Error("error inesperado");
        }
      } catch (error) {
        toast({
          title: "error",
          description: "sucedio un error inesperado intenta luego",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast({
        title: "autenticacion",
        description: "logueate antes",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const removeFromCart = async (id) => {
    try {
      const { status } = await removeFromCartApi(id);
      if (status === 204) {
        setCarrito(carrito.filter((previous) => previous._id !== id));
        toast({
          title: "eliminacion",
          description: "se elimino el producto del carrito",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        throw new Error("error inesperado");
      }
    } catch (error) {
      toast({
        title: "error",
        description: "sucedio un error inesperado intenta luego",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const buyProduct = async (id) => {
    try {
      //throw new Error("error inesperado");
      const { data, status } = await buyTheOrderApi(id);
      if (data.message === "OK" && status == "200") {
        setCarrito(carrito.filter((previous) => previous._id !== id));
        toast({
          title: "Pago procesado",
          description: "Tu pago ha sido exitoso.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate("/");
      } else {
        throw new Error("error inesperado");
      }
    } catch (error) {
      toast({
        title: "error",
        description: "sucedio un error inesperado intenta luego",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const changeQuantityMore = (id) => {
    setCarrito((previous) => {
      const updatedCart = previous.map((product) =>
        product._id === id && product.quantityItem < product.product.quantityMax
          ? {
              ...product,
              quantityItem: product.quantityItem + 1,
              total: (product.quantityItem + 1) * product.priceItem,
            }
          : product
      );
      const product = updatedCart.find((p) => p._id === id);

      updateOptions(id, product.quantityItem);
      return updatedCart;
    });
  };

  const changeQuantityLess = (id) => {
    setCarrito((previous) => {
      const updatedCart = previous.map((product) =>
        product._id == id && product.quantityItem > 1
          ? {
              ...product,
              quantityItem: product.quantityItem - 1,
              total: (product.quantityItem - 1) * product.priceItem,
            }
          : product
      );
      const product = updatedCart.find((p) => p._id === id);
      updateOptions(id, product.quantityItem);
      return updatedCart;
    });
  };

  /*   */
  const petition = (id, totalQuantity) => {
    updateCartApi(id, { quantity: totalQuantity })
      .then((data) => {
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateOptions = useCallback(debounce(petition, 300), []);

  const data = {
    getCart,
    addToCart,
    removeFromCart,
    buyProduct,
    changeQuantityMore,
    changeQuantityLess,
    carrito,
    loading,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  try {
    const auth = useContext(CartContext);
    if (!auth) throw new Error("error exists");
    return auth;
  } catch (error) {
    console.log(error);
  }
};
