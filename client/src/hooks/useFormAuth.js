import { useState } from "react";

export const useFormAuth = (initial = {}) => {
  const [fields, setFields] = useState(initial);

  const handlerChange = ({ target }) => {
    setFields((previous) => ({ ...previous, [target.name]: target.value }));
  };

  const validateErrors = () => {
    let isValid = true;
    for (let key in fields) {
      if (!fields[key]) {
        isValid = false;
        break;
      }
    }
    return isValid;
  };

  const handleSetFields = (values) => {
    setFields(values);
  };

  return {
    fields,
    handlerChange,
    validateErrors,
    handleSetFields,
  };
};
