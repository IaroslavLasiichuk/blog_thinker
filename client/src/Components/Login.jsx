import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

import {
    Text,
  } from '@chakra-ui/react';

import {
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

import { Button, Stack, Input } from '@chakra-ui/react';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
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
        <DrawerHeader>Login</DrawerHeader>
        <DrawerBody>
          <form onSubmit={handleFormSubmit}>
            <Stack spacing={3}>
              <Input
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
                variant="outline"
                placeholder="Email"
              />
              <Input
                name="password"
                type="password"
                id="password"
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
      </DrawerContent>
    </>
  );
};

export default Login;
