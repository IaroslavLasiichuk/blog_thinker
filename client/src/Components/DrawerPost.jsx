import React, { useState } from 'react';
import {
  Stack,
  Textarea,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import {
  Drawer,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_THOUGHT } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { QUERY_THOUGHTS } from '../utils/queries';

const DrawerPost = () => {
  const { data } = useQuery(QUERY_ME);
  console.log(data);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formState, setFormState] = useState({
    thoughtText: '',
  });

  const [addThought] = useMutation(ADD_THOUGHT, {
    onCompleted: ({ addThought }) => {
      setFormState({ thoughtText: '' });
    },
    refetchQueries: [{ query: QUERY_ME }, { query: QUERY_THOUGHTS }],
   
  });

  const handleFormSubmit = event => {
    event.preventDefault();

    if (!formState.thoughtText) {
      toast({
        title: 'An error occurred',
        description: 'Please enter text!!!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
    addThought({
      variables: {
        thoughtText: formState.thoughtText, 
      },
    });
    setFormState({ thoughtText: '' });
      } catch (err) {
        
      }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      {Auth.loggedIn() ? (
        <Stack textAlign={'center'} align={'center'}>
          <Stack spacing={6} direction={'row'}>
            <Button colorScheme="teal" onClick={onOpen}>
              <AddIcon margin={2} boxSize={4} />
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
                    <Textarea
                      required
                      name="thoughtText"
                      type="text"
                      value={formState.thoughtText}
                      id="content"
                      onChange={handleChange}
                      variant="outline"
                      placeholder="Please enter text..."
                    />
                    <Button
                      type="submit"
                      onClick={() => {
                        if (formState.thoughtText) {
                          toast({
                            title: 'Post created.',
                            description: "We've created new post for you.",
                            status: 'success',
                            position: 'top',
                            duration: 4000,
                            isClosable: true,
                          });
                        } else {
                          toast({
                            title: 'An error occurred.',
                            description: 'Unable to create post.',
                            status: 'error',
                            position: 'top',
                            duration: 5000,
                            isClosable: true,
                          });
                        }
                      }}
                    >
                      Submit
                    </Button>
                  </Stack>
                </form>
                <DrawerFooter borderTopWidth="1px"></DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Stack>
        </Stack>
      ) : null}
    </>
  );
};

export default DrawerPost;