import React from 'react'
import Navbar from './Navbar'
import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';

export default function Profile() {

  return (
    <>
     <Navbar/>
    <Container maxW={'5xl'}>
          
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
         It is empty{' '}
          <Text as={'span'} color={'orange.400'}>
           create new post 
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          This will be cool header for user profile!!!
        </Text>
        <Stack spacing={6} direction={'row'}>
        </Stack>
        <Flex w={'full'}>
        </Flex>
      </Stack>
    </Container>
    </>
  );
}
