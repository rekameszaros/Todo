import React from "react";
import { Box, Image, Text, Flex, Spacer, Center } from "@chakra-ui/react";
import listImage from "@/public/cph.png";

const Footer = () => {
  return (
    <Box bg="gray.200" py={4} px={8} textAlign="center" mt={"auto"} width={"100vw"}>
      <Flex justify="center">
        <Image src={listImage.src} alt="cph logo" w="200px" h="auto" />
        <Spacer />
        <Flex >
          <Text my={"auto"}>All rights reserved</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
