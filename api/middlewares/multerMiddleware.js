import { findRoutes } from "../libs/findRoutes.js";
import multer from "multer";
import ShortUniqueId from "short-unique-id";
import path from "path";

const uid = new ShortUniqueId({ length: 10 });

const location = findRoutes("/uploads");

let fileStorage;

const configMulter = {
  storage: (fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      //console.log(file);
      cb(null, location);
    },

    filename: function (req, file, cb) {
      //console.log(file);
      cb(null, uid.rnd() + "-" + file.originalname);
    },
  })),

  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("este no es un formato valido"));
  },
};

function fileFilter(req, file, cb) {
  const filetypes = /jpeg|jpg|png|gif|webp/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error("este no es un formato valido"));
}

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter,
}).array("files", 5);
export const multerMidManyImages = function (req, res, next) {
  upload(req, res, function (err) {
    if (err?.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .send({ image: "la imagen debe ser de maximo 1mb" });
    } else if (err?.code === "LIMIT_UNEXPECTED_FILE") {
      console.log(err.name);
      return res
        .status(400)
        .send({ image: "el numero de imagenes permitidos es 5" });
    } else if (err) {
      return res
        .status(400)
        .send({ image: err.message || "sucedio un error inesperado" });
    }

    next();
  });
};

const uploadSingleImage = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter,
}).single("file");
export const multerMidSingleImage = function (req, res, next) {
  uploadSingleImage(req, res, function (err) {
    if (err?.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .send({ image: "la imagen debe ser de maximo 1mb" });
    } else if (err?.code === "LIMIT_UNEXPECTED_FILE") {
      return res
        .status(400)
        .send({ image: "el numero de imagenes permitidos es 1" });
    } else if (err) {
      return res
        .status(400)
        .send({ image: err?.message || "sucedio un error inesperado" });
    }
    next();
  });
};
