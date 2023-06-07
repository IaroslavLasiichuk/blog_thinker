import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Textarea,
} from '@chakra-ui/react';

export default function SplitScreen() {
  // const [mailerState, setMailerState] = useState({
  //   name: "",
  //   email: "",
  //   message: "",
  // });

  // function handleStateChange(e) {
  //   setMailerState((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // }

  // const submitEmail = async (e) => {
  //   e.preventDefault();
  //   console.log({ mailerState });
  //   const response = await fetch(" http://localhost:4000/send", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify({mailerState }),
      
  //   })
  //     .then((res) => res.json())
  //     .then(async (res) => {
  //       const resData = await res;
  //       if (resData.status === 'success') {
  //         alert("Message Sent");
  //       } else if (resData.status === "fail") {
  //         alert("Message failed to send");
  //       }
  //     })
  //     .then(() => {
  //       setMailerState({
  //         name: "",
  //         email: "",
  //         message: "",
  //       });
  //     });
  // };

  return (
    <>
      <Flex minHeight="100vh" flexDir="column">
        <Navbar />
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
          <Flex p={8} flex={1} align={'center'} justify={'center'}>
            <Stack spacing={4} w={'full'} maxW={'md'}>
              <Heading fontSize={'2xl'}>Contact Us</Heading>
              <form
            // onSubmit={submitEmail}
          >
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input
                 name="name"
                //  onChange={handleStateChange}
                //  value={mailerState.name}
                 type="text"
                 id="name"
                 required />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input 
                name="email"
                //  onChange={handleStateChange}
                //  value={mailerState.email}
                type="text"
                id="name"
                required />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Message</FormLabel>
                <Textarea
                name="message"
                //  onChange={handleStateChange}
                //  value={mailerState.message}
                 id="message"
                 required
                  placeholder="Here is a sample placeholder" />
              </FormControl>
              <Stack spacing={6}>
                <Button 
                 type="submit"
                //  onSubmit={submitEmail}
                colorScheme={'blue'}
                 variant={'solid'}>
                  Send
                </Button>
               
              </Stack>
              </form>
            </Stack>
          </Flex>
          <Flex flex={1}>
            <Image
              alt={'Login Image'}
              objectFit={'cover'}
              src={
                'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
              }
            />
          </Flex>
        </Stack>
        <Footer />
      </Flex>
    </>
  );
}
