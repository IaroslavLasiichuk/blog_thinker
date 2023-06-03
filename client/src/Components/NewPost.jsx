import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Auth from '../utils/auth';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { useMutation } from '@apollo/client';
import { ADD_THOUGHT } from '../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../utils/queries';

import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Input,
  Box,
  Textarea,
  FormLabel,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

export default function Profile() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formState, setFormState] = useState({
    thoughtText: '',
    
  });

  // Set up our mutation with an option to handle errors
  const [addThought, { error }] = useMutation(ADD_THOUGHT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // On form submit, perform mutation and pass in form data object as arguments
    // It is important that the object fields are match the defined parameters in `ADD_THOUGHT` mutation
    try {
      const { data } = addThought({
        variables: { ...formState }
       
      });
      // console.log(data);

    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'thoughtText') {
      setFormState({ ...formState, [name]: value });
    }
  };
  return (
    <>
    <Flex minHeight="100vh" flexDir="column">
      <Navbar />
      <Container maxW={'5xl'}  flex="1">
      {Auth.loggedIn() ? (
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Create a new post{' '}
            <Text as={'span'} color={'orange.400'}>
              for Thinker
            </Text>
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'}>
            This will be cool header for user profile!!!
          </Text>
          <Stack spacing={6} direction={'row'}>
                <Button colorScheme="teal" onClick={onOpen}>
                  Create Post
                </Button>
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">
                  Add new post
                </DrawerHeader>
                <form onSubmit={handleFormSubmit}>
            <Stack spacing={3}>
              {/* <Input
                name="title"
                type="text"
                value={formState.title}
                id="title"
                onChange={handleChange}
                variant="outline"
                placeholder="Title"
              /> */}
             <Textarea name="thoughtText"
                type="text"
                value={formState.thoughtText}
                id="content"
                onChange={handleChange}
                variant="outline"
                placeholder="Content" placeholder="Here is a sample placeholder" />

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
                <DrawerFooter borderTopWidth="1px">
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Stack>
        </Stack>
         ) : (
          <Box textAlign="center" py={10} px={6}>
          <WarningTwoIcon boxSize={'50px'} color={'orange.300'} />
          <Heading
          textAlign={'center'}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Please login{' '}
            <Text as={'span'} color={'orange.400'}>
              to create a post
            </Text>
          </Heading>
        </Box>
        )}
      </Container>
      <Footer/>
      </Flex>
    </>
  );
}
