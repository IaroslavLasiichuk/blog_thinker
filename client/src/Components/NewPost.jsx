import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Posts from './Posts';

import {
  Flex,
  Container,
} from '@chakra-ui/react';

export default function Profile() {
 
  return (
    <>
    <Flex minHeight="100vh" flexDir="column">
      <Navbar />
      <Container maxW={'5xl'}  flex="1">
        <Posts/>
      </Container>
      <Footer/>
      </Flex>
    </>
  );
}
