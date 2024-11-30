/* eslint-disable react/prop-types */
import { Box } from "@chakra-ui/react";

export const PreInput = ({ header, desc }) => {
  return (
    <>
      <Box as="h2" color={"teal"} fontWeight={"bolder"}>
        {header}
      </Box>
      <Box as="p" color={"teal"}>
        {desc}
      </Box>
    </>
  );
};
