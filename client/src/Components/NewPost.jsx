import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Auth from '../utils/auth';
import { WarningTwoIcon } from '@chakra-ui/icons';

import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Input,
  Box,
  Textarea,
  FormLabel,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

export default function Profile() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
    <Flex minHeight="100vh" flexDir="column">
      <Navbar />
      <Container maxW={'5xl'}  flex="1">
      {Auth.loggedIn() ? (
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
            Create a new post{' '}
            <Text as={'span'} color={'orange.400'}>
              for Thinker
            </Text>
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'}>
            This will be cool header for user profile!!!
          </Text>
          <Stack spacing={6} direction={'row'}>
                <Button colorScheme="teal" onClick={onOpen}>
                  Create Post
                </Button>
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">
                  Add new post
                </DrawerHeader>
                <DrawerBody>
                  <Stack spacing="24px">
                    <Box>
                      <FormLabel htmlFor="username">Title</FormLabel>
                      <Input id="title" placeholder="Please enter title" />
                    </Box>
                    <Box>
                      <FormLabel htmlFor="desc">Description</FormLabel>
                      <Textarea id="desc" />
                    </Box>
                  </Stack>
                </DrawerBody>
                <DrawerFooter borderTopWidth="1px">
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="blue">Submit</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Stack>
        </Stack>
         ) : (
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
        </Box>
        )}
      </Container>
      <Footer/>
      </Flex>
    </>
  );
}
