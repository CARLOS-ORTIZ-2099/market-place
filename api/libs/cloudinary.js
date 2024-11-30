import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadStream = (buffer) => {
  return new Promise((resolve, reject) => {
    const config = { folder: process.env.NAME };

    const cloudinaryDone = (err, result) => {
      return err ? reject(err) : resolve(result);
    };

    cloudinary.uploader.upload_stream(config, cloudinaryDone).end(buffer);
  });
};

export const uploadImage = async (imagePath) => {
  const options = {
    use_filename: true,

    unique_filename: true,

    folder: process.env.NAME,
  };

  return await cloudinary.uploader.upload(imagePath, options);
};

export const deleteOneImageCloud = async (id) => {
  return await cloudinary.uploader.destroy(id);
};

export const deleteAllImage = async (images) => {
  return await cloudinary.api.delete_resources(images);
};
