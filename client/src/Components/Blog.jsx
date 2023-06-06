import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Heading,
  Button,
  Text,
  Stack,
  Container,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';

const Post = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const PostContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
    >
      {children}
    </Stack>
  );
};

const AuthorName = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}
    >
      {children}
    </Text>
  );
};

const CreatedAt = ({ children }: { children: ReactNode }) => {
  return (
    <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize={'sm'}>
      {children}
    </Text>
  );
};

const PostText = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  );
};
const CommentText = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue('gray.100', 'gray.800')}
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
        borderTopColor: useColorModeValue('gray.100', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '90%',
        transform: 'translateX(-50%)',
      }}
    >
      <Heading as={'h5'} fontSize={'sm'}>
        {children}
      </Heading>
    </Stack>
  );
};

export default function Blog() {
  return (
    <>
      <Flex
        flexDir="row"
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Box bg={useColorModeValue('gray.100', 'gray.700')}>
          <Container maxW={'7xl'} py={16} as={Stack} spacing={12} flex="3">
            <Stack spacing={0} align={'center'}>
              <Heading>Every developer has a tab open to Thinker</Heading>
              <Text>Here will be some cool headindg</Text>
            </Stack>
            <Stack
              borderRadius={15}
              direction={{ base: 'column', md: 'column' }}
              spacing={{ base: 10, md: 1, lg: 10 }}
            >
              <Post>
                <PostContent>
                  <PostText>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Nostrum, debitis sunt. Animi
                  </PostText>

                  <AuthorName>Author name: </AuthorName>
                  <CreatedAt>time data month year</CreatedAt>
                  <CommentText>
                    {' '}
                    perspiciatis odio deleniti autem! Est recusandae eveniet
                    possimus repellendus dolore voluptate laboriosam tempore
                    nemo dolores fugiat, laborum aliquid.
                  </CommentText>
                  <Textarea margin={4}></Textarea>
                  <Button textColor={'black'}
              fontSize={'14'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              textAlign={'center'}
              to={'/contact'}
              rounded={'full'}
              px={6}
              colorScheme={'orange'}
              bg={'orange.400'}
              _hover={{ bg: 'orange.500' }}
              >Comment</Button>
                </PostContent>
              </Post>
            </Stack>
          </Container>
        </Box>
      </Flex>
    </>
  );
}
