/* eslint-disable no-prototype-builtins */
import { useEffect, useState } from "react";

export const useFormFields = (initial) => {
  const [formData, setFormData] = useState(initial);
  const [errors, setErrors] = useState(false);

  const handlerChange = (e) => {
    //console.log(e)
    const ev = e.target;
    const hasProperty = ev.hasOwnProperty("checked");

    setFormData((previous) => ({
      ...previous,
      [ev.name]: hasProperty ? (ev.checked ? ev.id : "") : ev.value,
    }));
  };

  useEffect(() => {
    let timeError;
    if (errors) {
      timeError = setTimeout(() => {
        setErrors(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timeError);
    };
  }, [errors]);

  const validateErrors = (photos) => {
    let err = false;
    if (photos.length < 1) {
      err = { images: { message: "selecciona almenos una imagen" } };
    }
    for (let key in formData) {
      if (!formData[key]) {
        err = { ...err, [key]: { message: `el campo ${key} es requerido` } };
      }
    }
    return err;
  };

  const handleSetErrors = (data) => {
    setErrors(data);
  };

  const handleSetFields = (data) => {
    setFormData(data);
  };

  return {
    formData,
    errors,
    handlerChange,
    validateErrors,
    setErrors,
    handleSetFields,
    handleSetErrors,
  };
};
