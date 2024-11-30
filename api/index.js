import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import dotenv from "dotenv";
import path from "node:path";

import { authRoutes } from "./routes/authRoutes.js";
import { productRoutes } from "./routes/productRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";

import { db } from "./database/db.js";
import { MyError } from "./errors/MyError.js";
import { notFound } from "./middlewares/notFound.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(compression());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.use((err, req, res, next) => {
  // campo duplicado validado por mongo db
  if (err.code == "11000") {
    const keyData = Object.keys(err.keyValue)[0];
    res.status(409).send({ [keyData]: `${keyData} no valido` });
  }
  // errores personalizados mios
  else if (err instanceof MyError) {
    res.status(err.statusCode || 400).send({ message: err.message });
  }
  // errores de validacion de mongoose
  else if (err.errors) {
    const data = {};
    for (let key in err.errors) {
      data[key] = err.errors[key].message;
    }
    res.status(400).send(data);
  }
  // errores de validacion de mongoose
  else {
    res.status(500).send({ message: err.message || err });
  }
});

app.use(notFound);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
  db();
});
