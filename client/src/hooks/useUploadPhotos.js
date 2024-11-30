import { useState } from "react";
import { MAX_NUMBER_IMAGES } from "../consts.js";

export const useUploadPhotos = (mode = "single") => {
  const [photos, setPhotos] = useState([]);
  const [photosDelete, setPhotosDelete] = useState([]);
  const [photo, setPhoto] = useState({ file: "", result: "" });

  const uploadPhotos = (e) => {
    let files = e.target.files;
    let long = e.target.files.length;
    //console.log(files);

    if (long + photos.length > MAX_NUMBER_IMAGES) {
      long = MAX_NUMBER_IMAGES - photos.length;
      console.log(long);
      //return;
    }
    for (let i = 0; i < long; i++) {
      const reader = new FileReader();

      reader.readAsDataURL(files[i]);

      reader.addEventListener("load", (event) => {
        if (mode === "multiple") {
          setPhotos((previous) => [
            ...previous,
            {
              file: files[i],
              result: event.target.result,
              id: event.timeStamp,
            },
          ]);
        } else {
          setPhoto({ file: files[i], result: event.target.result });
        }
      });
    }
  };

  const handleSetPhotos = (data) => {
    setPhotos(data);
  };

  const handleSetPhotosDelete = (data) => {
    setPhotosDelete(data);
  };
  const removePhoto = (photo) => {
    if (typeof photo.id == "string") {
      setPhotosDelete((previous) => [...previous, photo]);
    }
    setPhotos([...photos.filter((photoDelete) => photoDelete.id !== photo.id)]);
  };

  const selectImageMain = (photo) => {
    setPhotos([
      photo,
      ...photos.filter((photoMain) => photoMain.id !== photo.id),
    ]);
  };

  return {
    uploadPhotos,
    photos,
    photo,
    photosDelete,
    handleSetPhotos,
    handleSetPhotosDelete,
    removePhoto,
    selectImageMain,
  };
};
