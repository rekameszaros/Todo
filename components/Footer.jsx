// import React from "react";
// import { Box, Image, Text, Flex, Spacer, Center } from "@chakra-ui/react";
// import listImage from "@/public/logo.svg";
// import { FiInfo } from "react-icons/fi";

// const Footer = () => {
//   return (
//     <Box bg="gray.500" py={4} px={8} textAlign="center" mt={"auto"} width={"100vw"}>
//       <Flex justify="center">
//         <Image src={listImage.src} alt="cph logo" w="200px" h="auto" />
//         <Spacer />
//         <Flex align="center">
//           <FiInfo />
//           <Text ml={2} my={"auto"} color="white">All rights reserved</Text>
//         </Flex>
//       </Flex>
//     </Box>
//   );
// };

// export default Footer;

import React from "react";
import { Box, Image, Text, Flex, Spacer, Center } from "@chakra-ui/react";
import { FaRegCopyright } from "react-icons/fa";
import listImage from "@/public/logo.svg";

const Footer = () => {
  return (
    <Box bg="gray.500" py={4} px={8} textAlign="center" mt="auto" width="100vw">
      <Flex justify="center">
        <Image src={listImage.src} alt="cph logo" w="200px" h="auto" />
        <Spacer />
        <Flex align="center">
          <FaRegCopyright color="white"/>
          <Text ml={2} my="auto" color="white">All rights reserved</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
