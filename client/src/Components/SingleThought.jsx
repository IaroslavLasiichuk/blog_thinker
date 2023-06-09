import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CommentForm from './CommentForm';
import {
 Spinner,
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  useColorModeValue,
} from '@chakra-ui/react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_THOUGHT } from '../utils/queries';

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
    textalign={'center'}
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

const SingleThought = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const bgBoxColor = useColorModeValue('gray.100', 'gray.700');
  const { thoughtId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
    variables: { thoughtId: thoughtId },
  });

  if (loading) {
    // Handle loading state, e.g., display a loading spinner
    return (
      <Stack direction="row" spacing={4}>
        <Spinner size="xl" />
      </Stack>
    );
  }
  const thought = data?.thought || {};
  console.log(thought);

  return (
    <>
      <Navbar />
     
      <Flex
        bg={bgColor}
        flexDir="column"
        minH={'100vh'}
        align={'center'}
        justify={'center'}
      >
        <Box bg={bgBoxColor}>
          <Container maxW={'7xl'} py={16} as={Stack} spacing={12} flex="3">
          <Heading>
        {thought.thoughtAuthor} had this thought on{' '}
        <Text as={'span'} color={'orange.400'}>
          {thought.createdAt}
        </Text>
      </Heading>
            <Stack spacing={0} align={'center'}>
              <Text margin={1}>List of posts and comments</Text>
            </Stack>
            <Stack
              borderRadius={15}
              direction={{ base: 'column', md: 'column' }}
              spacing={{ base: 10, md: 1, lg: 10 }}
            >
              <>
                <Post>
                  <PostContent >
                    <PostText>{thought.thoughtText}</PostText>
                    <AuthorName>Author: {thought.thoughtAuthor}</AuthorName>
                    <CreatedAt>Created at: {thought.createdAt}</CreatedAt>
                  </PostContent>
                  {!thought.comments.length ? (
                                                  <Text fontSize='12px' color='tomato'>No comments yet...</Text>

                        ) : (
                          
                          <div>
                            <Text margin={3} fontSize='20px' color='black'>Comments...</Text>
                            {thought.comments.map(comment => (
                              <div key={comment._id}>
                                  
                                <CommentText>{comment.commentText}</CommentText>
                                <AuthorName>
                                  Author: {comment.commentAuthor}
                                </AuthorName>
                                <CreatedAt>
                                  Created at: {comment.createdAt}
                                </CreatedAt>
                              </div>
                            ))}
                          </div>
                        )}
                </Post>
              </>
            </Stack>
            <CommentForm thoughtId={thought._id}/>
           
          </Container>
        </Box>
      </Flex>
      <Footer />
    </>
  );
};

export default SingleThought;
