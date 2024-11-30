import { MyError } from "../errors/MyError.js";
import { deleteOneImageCloud, uploadStream } from "../libs/cloudinary.js";
import { createToken, decodifiedToken } from "../libs/createToken.js";
import { UserModel } from "../models/User.js";
import bcrypt from "bcryptjs";
import { processImageAvatar } from "../libs/processImage.js";

export const register = async (req, res, next) => {
  try {
    //throw new Error("error unknown");
    const { body } = req;
    const user = new UserModel(body);
    await user.save();
    res.status(201).send({ message: "register successfully" });
  } catch (error) {
    console.log("entroo");
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const regex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      return next(new MyError("inserta un email valido", 400));
    }

    if (!password || password.trim().length < 6)
      return next(new MyError("inserta un password valido", 400));

    const userFound = await UserModel.findOne({ email });
    if (!userFound) return next(new MyError("usuario no encontrado", 404));

    const isvalidPassword = await bcrypt.compare(password, userFound.password);

    if (!isvalidPassword)
      return next(new MyError("error al autenticar usuario", 404));

    const token = await createToken({
      id: userFound._id,
      email: userFound.email,
      name: userFound.name,
    });

    const user = { ...userFound._doc };
    delete user.password;

    res
      .cookie("token-market", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: false,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .send({ user: user, token });
  } catch (error) {
    console.log("entroo");
    next(error);
  }
};

export const closeSession = async (req, res, next) => {
  res.clearCookie("token-market").send({ message: "close session" });
};

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies["token-market"];
    //console.log(token);
    if (!token) {
      return next(new MyError("usuario no autenticado", 404));
    }
    const { id } = await decodifiedToken(token);
    const user = await UserModel.findById({ _id: id }).select("-password");
    if (!user) {
      throw new Error("no se encontro al usuario");
      //return next(new MyError("no se encontro al usuario", 404));
    }
    res.status(200).send({ user });
  } catch (error) {
    res.clearCookie("token-market");
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { file } = req;
    //console.log(file);
    const { body } = req;
    const { id } = req.params;
    const userFound = await UserModel.findById({ _id: id });
    if (!userFound) {
      return next(new MyError("usuario no existe", 404));
    }

    userFound.name = body?.name?.trim() || userFound.name;
    userFound.lastName = body?.lastName?.trim() || userFound.lastName;
    userFound.bio = body?.bio?.trim() || "";
    userFound.email = body?.email?.trim() || userFound.email;
    userFound.password = body?.password?.trim() || userFound.password;
    await userFound.save();

    if (file) {
      const processedImage = await processImageAvatar(file.buffer);
      const { public_id, secure_url } = await uploadStream(processedImage);
      userFound.avatar &&
        (await deleteOneImageCloud(userFound.avatar.public_id));
      userFound.avatar = { public_id, secure_url };
      await userFound.save();
    }

    const user = { ...userFound._doc };
    delete user.password;
    res.send(user);
  } catch (error) {
    next(error);
  }
};
