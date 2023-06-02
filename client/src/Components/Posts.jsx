import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Link as RouterLink } from 'react-router-dom';
import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Link,
  Input,
  Box,
  InputGroup,
  InputLeftAddon,
  Textarea,
  Select,
  InputRightAddon,
  FormControl,
  FormLabel,
  Button,
  Icon,
  IconProps,
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
  } from '@chakra-ui/react'

export default function Profile() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
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
