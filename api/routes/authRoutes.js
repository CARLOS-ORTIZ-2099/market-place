import express from "express";
import {
  closeSession,
  login,
  register,
  updateUser,
  verifyToken,
} from "../controllers/authController.js";
import { multerMidSingleImage } from "../middlewares/multerMiddleware.js";
import { validateAuth } from "../middlewares/validateAuth.js";

export const authRoutes = express.Router();

authRoutes.get("/", (req, res, next) => {
  res.send({ message: "welcome to home " });
});

authRoutes.post("/register", register);

authRoutes.post("/login", login);

authRoutes.post("/closeSession", closeSession);

authRoutes.get("/verifyToken", verifyToken);

authRoutes.put(
  "/updateUser/:id",
  validateAuth,
  multerMidSingleImage,
  updateUser
);
