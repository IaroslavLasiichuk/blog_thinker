import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Flex, Container, Heading, Stack, Text } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

const Profile = () => {
 
  const { loading, error, data } = useQuery(QUERY_USER);
  
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.error(error);
    return <p>Something went wrong!</p>;
  }
  const userData = data?.me; 
  console.log(userData);

  
 
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
            {userData.map( (data)=>{
              return(
                <h1>{data.username}</h1>
              )
            })}
            <Heading
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}
            >
              It is empty{' '}
              <Text as={'span'} color={'orange.400'}>
                create new post
              </Text>
            </Heading>
            <Text color={'gray.500'} maxW={'3xl'}>
              This will be cool header for user profile!!!
            </Text>
            <Stack spacing={6} direction={'row'}></Stack>
            <Flex w={'full'}></Flex>
          </Stack>
        </Container>
        <Footer />
      </Flex>
    </>
   );
  };
export default Profile;