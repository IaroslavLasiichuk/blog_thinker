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
} from '@chakra-ui/react';
import { WarningTwoIcon } from '@chakra-ui/icons';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';

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
      bg={useColorModeValue('gray.100', 'gray.800')}
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
        borderTopColor: useColorModeValue('gray.100', 'gray.800'),
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
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const bgBoxColor = useColorModeValue('gray.100', 'gray.700');
  const { loading, error, data } = useQuery(QUERY_THOUGHTS);
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
              <Heading>Every developer has a tab open to Thinker</Heading>
              <Text>Here will be some cool headindg</Text>
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

                  <AuthorName>{thought.thoughtAuthor}</AuthorName>
                  <CreatedAt>{thought.createdAt}</CreatedAt>
                  {!thought.comments ? <div>'no comments'</div> : <CommentText>
                    {' '}
                    perspiciatis odio deleniti autem! Est recusandae eveniet
                    possimus repellendus dolore voluptate laboriosam tempore
                    nemo dolores fugiat, laborum aliquid.
                  </CommentText>}
                  
                  <Textarea
                    margin={4}
                    placeholder={'Enter your comment'}
                  ></Textarea>
                  <Button
                    textColor={'black'}
                    fontSize={'14'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    textAlign={'center'}
                    to={'/contact'}
                    rounded={'full'}
                    px={6}
                    colorScheme={'orange'}
                    bg={'orange.400'}
                    _hover={{ bg: 'orange.500' }}
                  >
                    Comment
                  </Button>
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
