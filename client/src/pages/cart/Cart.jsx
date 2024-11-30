/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useCart } from "../../context/CartProvider";
import { TemplateCarritoProduct } from "../../components/template-carrito-product/TemplateCarritoProduct";
import { CartEmpty } from "../cart-empty/CartEmpty";

export const Cart = () => {
  const { auth } = useAuth();
  const {
    getCart,
    carrito,
    removeFromCart,
    changeQuantityMore,
    changeQuantityLess,
  } = useCart();

  useEffect(() => {
    //console.log("hi");
    if (auth) {
      getCart();
    }
  }, [auth]);

  return (
    <>
      {carrito.length > 0 ? (
        <TemplateCarritoProduct
          funciones={{
            changeQuantityLess,
            changeQuantityMore,
            removeFromCart,
          }}
        />
      ) : (
        <CartEmpty />
      )}
    </>
  );
};
