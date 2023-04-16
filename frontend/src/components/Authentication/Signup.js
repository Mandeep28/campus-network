
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";

import {  VStack, Button } from "@chakra-ui/react";

import { useState } from "react";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";


const Signup = () => {
  const [show, setShow] = useState(false);
 
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [role , setRole] = useState("student");

  const toast = useToast();

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    console.log(name, email);

    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await axios.post( "/api/v1/auth/register", { name, email, password , hidden: role}, config );
      console.log(data);

      toast({
        title: "Check the mail to verify account.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

     
      setLoading(false);

    } catch (error) {
      console.log(error.response.data);  
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  const handleRadio = (e)=>{
    setRole(e.currentTarget.value);
    console.log(e.currentTarget.value)
  }
    

  return (
    <VStack spacing="5px">
    <div className = "d-flex justify-content-start align-item-start" style={{width: "100%"}}>
    <p> Register As: </p>
  <div className="form-check mx-4">
    <input
      className="form-check-input"
      type="radio"
      name="flexRadioDefault"
      id="flexRadioDefault1"
      checked
      value="student"
      style={{cursor: "pointer"}}
      onClick={handleRadio}
    />
    <label className="form-check-label" htmlFor="flexRadioDefault1">
       Student
    </label>
  </div>
  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      name="flexRadioDefault"
      id="flexRadioDefault2"
      style={{cursor: "pointer"}}
      value="teacher"
      onClick={handleRadio}
      
    />
    <label className="form-check-label" htmlFor="flexRadioDefault2">
      Teacher
    </label>
  </div>
  </div>

      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button colorScheme='blue' h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button colorScheme='blue' h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button fontWeight="bold"
        colorScheme="yellow"
        width="100%"
        style={{ marginTop: 15, fontWeight: 'bold' }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;