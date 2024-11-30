import { MyError } from "../errors/MyError.js";
import jwt from "jsonwebtoken";
import { decodifiedToken } from "../libs/createToken.js";

export const validateAuth = async (req, res, next) => {
  try {
    const token = req.cookies["token-market"];
    //console.log(token);
    if (!token) {
      return next(new MyError("logueate antes", 404));
    }
    const decode = await decodifiedToken(token);
    req.user = decode;
    next();
  } catch (err) {
    console.log("entrooo");
    next(err);
  }
};
