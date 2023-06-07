import { ReactNode } from 'react';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Auth from '../utils/auth';
import {
  Box,
  Link,
  Flex,
  Heading,
  Button,
  Text,
  Stack,
  Container,
  Textarea,
  Spinner,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { WarningTwoIcon } from '@chakra-ui/icons';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import { ADD_COMMENT } from '../utils/mutations';

const Post = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const PostContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
    >
      {children}
    </Stack>
  );
};

const AuthorName = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}
    >
      {children}
    </Text>
  );
};

const CreatedAt = ({ children }: { children: ReactNode }) => {
  return (
    <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize={'sm'}>
      {children}
    </Text>
  );
};

const PostText = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  );
};
const CommentText = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue('blue.100', 'blue.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('blue.100', 'blue.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '90%',
        transform: 'translateX(-50%)',
      }}
    >
      <Heading as={'h5'} fontSize={'sm'}>
        {children}
      </Heading>
    </Stack>
  );
};

export default function Blog() {
  const toast = useToast();
  const [formState, setFormState] = useState({
    commentText: '',
  });
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const bgBoxColor = useColorModeValue('gray.100', 'gray.700');
  const { loading, error, data, refetch  } = useQuery(QUERY_THOUGHTS);

// Set up our mutation with an option to handle errors
const [addComment, { error: mutationError }] = useMutation(ADD_COMMENT, {
  onCompleted: () => {
    setFormState({ commentText: '' });
    refetch(); // Fetch the updated list of posts
  },
});

const handleFormSubmit = async (event) => {
  event.preventDefault();
  if (!formState.commentText) {
    toast({
      title: 'An error occurred',
      description: 'Please enter text!!!',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });

    // Handle empty field error here, e.g., display an error message
    return;
  }
  // On form submit, perform mutation and pass in form data object as arguments
  // It is important that the object fields are match the defined parameters in `ADD_THOUGHT` mutation
  try {
    const { data } = addComment({
      variables: {
        thoughtId: "647fe7a120a8e932a9c7d0dd" , // Replace with the actual thought ID
        commentText: { ...formState }, // Replace with the actual comment text
      },
    });
    setFormState({ commentText: '' });

  } catch (err) {
    console.error(err);
  }
};

const handleChange = (event) => {
  const { name, value } = event.target;
  if (name === 'commentText') {
    setFormState({ ...formState, [name]: value });
  }
};


  if (loading) {
    // Handle loading state, e.g., display a loading spinner
    return (
      <Stack direction="row" spacing={4}>
        <Spinner size="xl" />
      </Stack>
    );
  }

  if (error) {
    // Handle error state, e.g., display an error message
    return (
      <div>
        Error: {error.message}
      </div>
    );
  }
  const {thoughts} = data;
  // const user = users.map((th)=>{
  //   console.log(data);
  // });
console.log(thoughts);
  return (
    <>
      <Flex
        flexDir="row"
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={bgColor}
      >
        <Box
         bg={bgBoxColor}
         >
          <Container maxW={'7xl'} py={16} as={Stack} spacing={12} flex="3">
            <Stack spacing={0} align={'center'}>
              <Heading>Every developer {' '}<Text as={'span'} color={'orange.400'}>has a tab open to Thinker</Text></Heading>
              <Text margin={3}>List of posts and comments</Text>
            </Stack>
            <Stack
              borderRadius={15}
              direction={{ base: 'column', md: 'column' }}
              spacing={{ base: 10, md: 1, lg: 10 }}
            >
               {thoughts && (
                 <>
        {thoughts.map((thought) => (
          
                <Post key={thought._id}>
                <PostContent>
                  <PostText>
                  {thought.thoughtText}
                  </PostText>

                  <AuthorName>Author: {thought.thoughtAuthor}</AuthorName>
                  <CreatedAt>Created at: {thought.createdAt}</CreatedAt>
                  {!thought.comments ? <CommentText>
                    {' '}
                    No comments yet ................
                  </CommentText> : <CommentText>
                    {' '}
                    perspiciatis odio deleniti autem! Est recusandae eveniet
                    possimus repellendus dolore voluptate laboriosam tempore
                    nemo dolores fugiat, laborum aliquid.
                  </CommentText>}
                  <form onSubmit={handleFormSubmit}>
                  <Textarea
                    margin={4}
                    placeholder={'Enter your comment'}
                    required
                    name="commentText"
                    type="text"
                    value={formState.commentText}
                    id="comment"
                    onChange={handleChange}
                  ></Textarea>
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
                  </form>
                </PostContent>
              </Post>
                ))}
                </>
              )}
              
            </Stack>
          </Container>
        </Box>
      </Flex>
    </>
  );
}
