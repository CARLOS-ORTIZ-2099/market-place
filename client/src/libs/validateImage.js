export function validateImage(image) {
  let error = false;
  const validTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  if (!validTypes.includes(image.type.toLowerCase())) {
    return (error = "inserta una imagen del tipo correcto");
  } else if (image.size > 1 * 1024 * 1024) {
    return (error = "inserta una imagen de maximo 1mb");
  }

  return error;
}
