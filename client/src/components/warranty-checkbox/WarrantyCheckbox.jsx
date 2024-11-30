/* eslint-disable react/prop-types */
import { Box, Checkbox } from "@chakra-ui/react";

export const WarrantyCheckbox = ({ handlerChange, formData }) => {
  return (
    <Box my={7}>
      <Checkbox
        id="garantia-vendedor"
        type="checkbox"
        name="warranty"
        onChange={handlerChange}
        isChecked={formData.warranty == "garantia-vendedor"}
      >
        garantia del vendedor
      </Checkbox>

      <Checkbox
        id="garantia-fabrica"
        type="checkbox"
        name="warranty"
        onChange={handlerChange}
        isChecked={formData.warranty == "garantia-fabrica"}
      >
        garantia de fabrica
      </Checkbox>
      <Checkbox
        id="sin-garantia"
        type="checkbox"
        name="warranty"
        onChange={handlerChange}
        isChecked={formData.warranty == "sin-garantia"}
      >
        sin garantia
      </Checkbox>
    </Box>
  );
};
