import jwt from "jsonwebtoken";
import { MyError } from "../errors/MyError.js";

export const createToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { ...payload },
      process.env.SECRETWORD,
      { expiresIn: "1d" },
      function (err, token) {
        if (err) {
          reject(new MyError("error al crear el token", 500));
        } else {
          resolve(token);
        }
      }
    );
  });
};

export const decodifiedToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRETWORD, function (err, decoded) {
      if (err) {
        reject(new MyError(err?.message || "error al obtener token", 500));
      } else {
        resolve(decoded);
      }
    });
  });
};
