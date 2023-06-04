import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Link,
  Card,
  Box,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import {
  List,
  ListItem,
  ListIcon,
  DeleteIcon, 
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react'
import { 
  WarningTwoIcon,
  AttachmentIcon,

} from '@chakra-ui/icons';
import { Spinner} from '@chakra-ui/react';

import Navbar from './Navbar';
import Footer from './Footer';
import { Flex, Container, Heading, Stack, Text } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

const Posts = () => {
  const { loading, error, data } = useQuery(QUERY_ME);
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
        <Box textAlign="center" py={10} px={6}>
          <WarningTwoIcon boxSize={'50px'} color={'orange.300'}/>
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

  // Destructure the user data from the response
  const { me } = data;

  return (
    <>
      <Flex
       minHeight="100vh" flexDir="column">
        <Navbar />
        <Container
         maxW={'5xl'} flex="1">
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
            <Heading as="h3" size="lg">
              List of your posts
            </Heading>
            {me && (
            <>
              {me.thoughts.map(thought => (
                    <List spacing={3}>
                    <ListItem
                     padding={6} border='1px' borderColor='gray.200' borderRadius='20px'>
                      <Text fontSize='3xl'> <ListIcon as={AttachmentIcon} color='green.500' />{thought.thoughtText}</Text>
                      <Text>Post created at: {thought.createdAt} by {me.username} post ID:{thought._id} </Text>
                      <Button marginX={2} colorScheme="orange">
                   Delete
                    </Button>
                      <Button marginX={2} colorScheme="green">
                   Edit
                    </Button>
                    </ListItem>
                  </List>
              ))}
            </>
          )}
          </Stack>
        </Container>
        {/* <SimpleGrid marginX={6} spacing={6} minChildWidth="300px" columns={4}> */}
        
       
    
        <Footer />
      </Flex>
    </>
  );
};
export default Posts;
