import React, { useState } from 'react';

import {
    Stack,
    Textarea,
    Button,
    useDisclosure,
    useToast
  } from '@chakra-ui/react';

import {
    Drawer,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react';

  import { AddIcon, WarningIcon } from '@chakra-ui/icons'

  import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_THOUGHT } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

  
  const DrawerPost = () => {
    const { loading, err, data, refetch } = useQuery(QUERY_ME);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [formState, setFormState] = useState({
      thoughtText: '',
    });
    // Set up our mutation with an option to handle errors
    const [addThought, { error: mutationError }] = useMutation(ADD_THOUGHT, {
      onCompleted: () => {
        setFormState({ thoughtText: '' });
        refetch(); // Fetch the updated list of posts
      },
    });
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      if (!formState.thoughtText) {
       alert('Please enter text!!!')
        // Handle empty field error here, e.g., display an error message
        return;
      }
      // On form submit, perform mutation and pass in form data object as arguments
      // It is important that the object fields are match the defined parameters in `ADD_THOUGHT` mutation
      try {
        const { data } = addThought({
          variables: { ...formState }
        });
        setFormState({ thoughtText: '' });
  
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
           {Auth.loggedIn() ? (
       
       <Stack
         textAlign={'center'}
         align={'center'}
         
       >
         <Stack spacing={6} direction={'row'}>
         <Button colorScheme="teal" onClick={onOpen}>
         <AddIcon
         margin={2}
          boxSize={4} />
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
               placeholder="Please enter text..." />
               <Button  type="submit"
     onClick={() =>{
       if(formState.thoughtText){
         toast({
           title: 'Post created.',
           description: "We've created new post for you.",
           status: 'success',
           position: 'top',
           duration: 4000,
           isClosable: true,
         })
       }
       else{
         toast({
           title: 'An error occurred.',
           description: 'Unable to create post.',
           status: 'error',
           position: 'top',
           duration: 5000,
           isClosable: true,
         })
       }
     }
     }
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
        ) : ( null
       )}  
        </>
    )
  }
  
  export default DrawerPost;