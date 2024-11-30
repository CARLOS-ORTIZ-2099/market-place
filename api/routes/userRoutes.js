import express from "express";
import {
  addToCart,
  addToFavorite,
  buyTheOrder,
  getAllUserFavourites,
  getAllUserFavouritesIds,
  removeCartProduct,
  showCartItems,
  updateCart,
} from "../controllers/userController.js";
import { validateAuth } from "../middlewares/validateAuth.js";

export const userRoutes = express.Router();

userRoutes.post("/addToCart/:id", validateAuth, addToCart);
userRoutes.delete("/removeCartProduct/:id", validateAuth, removeCartProduct);
userRoutes.put("/updateCart/:idItem", validateAuth, updateCart);
userRoutes.get("/showCartItems/", validateAuth, showCartItems);
userRoutes.delete("/buyTheOrder/:id", validateAuth, buyTheOrder);
userRoutes.post("/addToFavorite/:id", validateAuth, addToFavorite);
userRoutes.get("/getAllUserFavourites", validateAuth, getAllUserFavourites);
userRoutes.get(
  "/getAllUserFavouritesIds",
  validateAuth,
  getAllUserFavouritesIds
);
