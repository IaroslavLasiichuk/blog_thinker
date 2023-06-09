import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link as RouterLink } from 'react-router-dom';
import { WarningTwoIcon, AttachmentIcon, InfoIcon } from '@chakra-ui/icons';
import {
  Flex,
  Container,
  Spinner,
  Heading,
  Stack,
  Text,
  Link,
  Box,
  Button,
  List,
  ListItem,
  ListIcon,
  useToast,
} from '@chakra-ui/react';

import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_THOUGTH } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import { QUERY_THOUGHTS } from '../utils/queries';

const Posts = () => {
  const toast = useToast();
  const { loading, error, data, refetch } = useQuery(QUERY_ME);
  const [removeThought, { error: deleteError }] = useMutation(REMOVE_THOUGTH, {
    onCompleted: (thoughtId) => {
      
      refetch();
      toast({
        title: 'Post deleted',
        description: 'The post has been successfully deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: error => {
      console.error(deleteError);
      toast({
        title: 'An error occurred',
        description: 'Failed to delete the post. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
     refetchQueries: [{ query: QUERY_ME }, { query: QUERY_THOUGHTS }],
  });

  const handleDeletePost = async thoughtId => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeThought({
        variables: { thoughtId },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Stack direction="row" spacing={4}>
        <Spinner size="xl" />
      </Stack>
    );
  }
  if (error) {
    return (
      <div>
        Error: {error.message}
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
          <Link as={RouterLink} fontSize={'lg'} fontWeight={900} to="/">
            GO HOME
          </Link>
        </Box>
      </div>
    );
  }
  const { me } = data;

  return (
    <>
      <Flex minHeight="100vh" flexDir="column">
        <Navbar />
        <Container maxW={'5xl'} flex="1">
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
              Welcome{' '}
              <Text as={'span'} color={'orange.400'}>
                {' '}
                {me.username}
              </Text>{' '}
              to your profile
            </Heading>
            {!me.thoughts.length ? (
              <Heading as="h3" size="lg">
                No posts
              </Heading>
            ) : (
              <Heading as="h3" size="lg">
                List of your posts
              </Heading>
            )}
            {me && (
              <>
                {me.thoughts.map((thought, index) => (
                  <List spacing={3} key={thought._id}>
                    <ListItem
                      padding={6}
                      border="1px"
                      borderColor="gray.200"
                      borderRadius="20px"
                    >
                      <Text fontSize="3xl">
                        {' '}
                        <ListIcon as={AttachmentIcon} color="green.500" />
                        {thought.thoughtText}
                      </Text>
                      <Text>
                        <InfoIcon margin={2} w={5} h={5} color="blue.500" />
                        Post created at: {thought.createdAt} by {me.username}{' '}
                        post ID: {thought._id}
                      </Text>
                      <Button
                        onClick={() => handleDeletePost(thought._id)}
                        marginX={2}
                        colorScheme="orange"
                      >
                        Delete
                      </Button>
                    </ListItem>
                  </List>
                ))}
              </>
            )}
          </Stack>
        </Container>
        <Footer />
      </Flex>
    </>
  );
};
export default Posts;