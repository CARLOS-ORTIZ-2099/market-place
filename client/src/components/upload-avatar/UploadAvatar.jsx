/* eslint-disable react/prop-types */
import { Avatar, Box, FormControl, FormLabel, Input } from "@chakra-ui/react";

export const UploadAvatar = ({ uploadPhoto, user, image }) => {
  return (
    <FormControl>
      <FormLabel cursor="pointer" textAlign={"center"}>
        <Input
          type="file"
          name="images"
          onChange={uploadPhoto}
          display="none"
        />
        <Box>
          <Avatar
            bg="teal.500"
            size="2xl"
            name={`${user.name} ${user.lastName}`}
            src={image?.result || `${user?.avatar?.secure_url}`}
          />
        </Box>
        upload
      </FormLabel>
    </FormControl>
  );
};
