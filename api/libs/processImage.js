import sharp from "sharp";

export const processImageAvatar = async (buffer) => {
  //console.log(buffer)
  //console.log('entrooooooo')
  return await sharp(buffer)
    .webp({ quality: 80 })
    .resize({ width: 150, height: 150, fit: "cover" })
    .toBuffer();
};

export const processImage = async (buffer) => {
  //console.log(buffer)
  //console.log('entrooooooo')
  return await sharp(buffer)
    .webp({ quality: 80 })
    //.resize({ width: 150, height: 150, fit: 'cover' })
    .toBuffer();
};
