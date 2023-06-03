import {
    Box,
    Container,
    Stack,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';

  export default function Footer() {
    return (
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}>
  
        <Box
          borderTopWidth={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}>
          <Container
            as={Stack}
            maxW={'6xl'}
            py={2}
            direction={{ base: 'column', md: 'row' }}
            spacing={4}
            justify={{ base: 'center', md: 'center' }}
            align={{ base: 'center', md: 'center' }}
            textAlign={'center'}>
            <Text>Made by Joseph S.Ortega, Sutton Charpentier,
        Iaroslav Lasiichuk, Axel Irias © Inc.© 2023 All rights reserved</Text>
          </Container>
        </Box>
      </Box>
    );
  }