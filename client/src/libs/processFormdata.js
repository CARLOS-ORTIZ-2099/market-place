import { validateImage } from "./validateImage";

export const processFormdata = (
  image,
  toast,
  objectData,
  photosDelete = null
) => {
  const newFormData = new FormData();

  if (image.file) {
    let response = validateImage(image.file);
    if (response) {
      toast({
        title: "error",
        description: response,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    newFormData.append("file", image.file);
  } else if (image.length > 0) {
    const photosRemaind = [];
    for (let ele of image) {
      if (ele.file) {
        let response = validateImage(ele.file);
        if (response) {
          toast({
            title: "error",
            description: response,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          return;
        } else {
          newFormData.append("files", ele.file);
        }
      } else {
        photosRemaind.push(ele);
      }
    }

    photosRemaind.length > 0 &&
      newFormData.append("photosRemaind", JSON.stringify(photosRemaind));
    photosDelete.length > 0 &&
      newFormData.append("photosDelete", JSON.stringify(photosDelete));
  }

  for (let key in objectData) {
    newFormData.append(key, objectData[key]);
  }

  return newFormData;
};
