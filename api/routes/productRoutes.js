import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
} from "../controllers/productController.js";
import { validateAuth } from "../middlewares/validateAuth.js";
import { multerMidManyImages } from "../middlewares/multerMiddleware.js";

export const productRoutes = express.Router();

productRoutes.get("/", (req, res, next) => {
  //throw new Error('error')
  res.send({ message: "welcome to product page " });
});

productRoutes.get("/getAllProducts/:id?", getAllProducts);

productRoutes.get("/getOneProduct/:id", getOneProduct);

productRoutes.post(
  "/createProduct",
  validateAuth,
  multerMidManyImages,
  createProduct
);

productRoutes.delete("/deleteProduct/:id", validateAuth, deleteProduct);

productRoutes.put(
  "/updateProduct/:id",
  validateAuth,
  multerMidManyImages,
  updateProduct
);
