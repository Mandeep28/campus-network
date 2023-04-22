import React from 'react';
import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";

const UserListItem = ({user, handleFunction }) => { //user !notLoggedIn //selected to chat userId
  //const { user } = ChatState();

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      mt={5}
      borderRadius="lg"
    >
      <img src={user.image} alt="" className='rounded-circle mx-2 my-1' style={{width: "40px"}} />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs"> <b>Email : </b> {user.email} </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;