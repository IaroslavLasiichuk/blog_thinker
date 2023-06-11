import Posts from './Posts';

import {
  Flex,
  Container,
} from '@chakra-ui/react';

export default function NewPost() {
 
  return (
    <>
    <Flex minHeight="100vh" flexDir="column">
      <Container maxW={'5xl'}  flex="1">
        <Posts/>
      </Container>
      </Flex>
    </>
  );
}
