import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import React, { useState } from 'react';
import Auth from '../utils/auth';

import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

import {
  Text,
  Button,
  Stack,
  Input,
} from '@chakra-ui/react';

const Signup = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    username: '',
  });

  const [addUser, { error }] = useMutation(ADD_USER);
  const handleFormSubmit = async event => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        username: formState.username,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  
  return (
    <>
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Create your account</DrawerHeader>
        <DrawerBody>
          <form onSubmit={handleFormSubmit}>
            <Stack spacing={3}>
              <Input
                required
                name="username"
                type="username"
                id="username"
                onChange={handleChange}
                variant="outline"
                placeholder="Name"
              />
              <Input
                required
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
                variant="outline"
                placeholder="Email"
              />
              <Input
                required
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
                variant="outline"
                placeholder="Password"
              />
                {error ? (
         <Text fontSize='15px' color='tomato'>
        The provided credentials are incorrect
       </Text>
             ) : null}
              <Button
                type="submit"
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'pink.400'}
                _hover={{
                  bg: 'pink.300',
                }}
              >
                Submit
              </Button>
            </Stack>
          </form>
        </DrawerBody>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </>
  );
};

export default Signup;
