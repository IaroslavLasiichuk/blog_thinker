import { ReactNode } from 'react';
import Navbar from './Navbar'
import Footer from './Footer'
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';

import avatarIaroslav from '../img/IMG_5570.jpg'
import avatarSutton from '../img/20230409_111908.jpg'
import avatarJoseph from '../img/IMG_5309.JPG'
import avatarAxel from '../img/IMG_0717.jpeg'

const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
   
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}>
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: string;
  name: string;
  title: string;
}) => {
  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} alt={name} mb={2} />
      <Stack spacing={-1} align={'center'}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function About() {
  return (
    <>
  <Navbar/>
        <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>

    <Box bg={useColorModeValue('gray.100', 'gray.700')}>
      <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'}>
          <Heading>About Us</Heading>
          <Text>Here will be some cool headindg</Text>
        </Stack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 10, md: 4, lg: 10 }}>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Full stack developer</TestimonialHeading>
              <TestimonialText>
             I'm a young aspiring junior web developer with a passion for technology and a strong desire to make a difference in the world.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={avatarIaroslav}
              name={'Iaroslav Lasiichuk'}
              title={'Web Developer'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Web Developer</TestimonialHeading>
              <TestimonialText>
              Currently working towards becoming a web developer and has always had a passion for computers and technology.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={avatarSutton}
              name={'Sutton Charpentier'}
              title={'Web Developer'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Front end developer</TestimonialHeading>
              <TestimonialText>
              Joseph graduated from the University of Denver with a Business Degree and is currently practicing Full Stack Web Development at his Alma Mater.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={avatarJoseph}
              name={'Joseph S.Ortega'}
              title={'Web Developer'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Web Developer</TestimonialHeading>
              <TestimonialText>
              I'am currently in construction doing Fire Sprinkler Installing, needed a change so i enrolled to become a Full stack developer
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={avatarAxel}
              name={'Axel Irias'}
              title={'Web Developer'}
            />
          </Testimonial>
        </Stack>
      </Container>
      </Box>
      </Flex>
      <Footer/>
    </>
  );
}