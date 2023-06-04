import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  Box,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { Spinner } from '@chakra-ui/react'

import Navbar from './Navbar';
import Footer from './Footer';
import { Flex, Container, Heading, Stack, Text } from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { QUERY_THOUGHTS } from '../utils/queries';
import Auth from '../utils/auth';

import {
  Link,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react';

const Posts = () => {
  const { loading, error, data } = useQuery(QUERY_ME);

  if (loading) {
    // Handle loading state, e.g., display a loading spinner
    return <Stack direction='row' spacing={4}>
    <Spinner size='xl' />
  </Stack>;
  }

  if (error) {
    // Handle error state, e.g., display an error message
    return <div>
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
     
                
                 </div>;
  }

  // Destructure the user data from the response
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
            <Heading as="h3" size="lg">
              List of your posts
            </Heading>
          </Stack>
        </Container>
       
        <SimpleGrid marginX={6} spacing={6} minChildWidth="300px" columns={4}>
          {me && (
            <>
              {me.thoughts.map(thought => (
                <Card   w='100%'
                bg="gray.200" key={thought._id}>
                  <CardHeader>
                    <Heading size="md">{thought.title}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>{thought.thoughtText}</Text>
                  </CardBody>
                  <CardFooter
                >
                    
                    <Button marginX={2} colorScheme='orange'>Delete</Button>
                  <Button marginX={2} colorScheme='green'>Edit</Button>
                 
                  
                  </CardFooter>
                </Card>
              ))}
            </>
          )}
        </SimpleGrid>
    
        <Footer />
      </Flex>
    </>
  );
};
export default Posts;
