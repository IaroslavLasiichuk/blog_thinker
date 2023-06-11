import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Text,
  Box,
  Flex,
  Heading,
  Stack,
  Container,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';

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

const CommentText = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue('blue.100', 'blue.800')}
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
        borderTopColor: useColorModeValue('blue.100', 'blue.800'),
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

function Blog() {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const bgBoxColor = useColorModeValue('gray.100', 'gray.700');
  const { loading, error, data } = useQuery(QUERY_THOUGHTS);

  if (loading) {
    // Handle loading state, e.g., display a loading spinner
    return (
      <Stack direction="row" spacing={4}>
        <Spinner size="xl" />
      </Stack>
    );
  }
  
  if (error) {
    // Handle error state, e.g., display an error message
    return <div>Error: {error.message}</div>;
  }
  const { thoughts } = data;

  return (
    <>
      <Flex
        flexDir="row"
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={bgColor}
      >
        <Box bg={bgBoxColor}>
          <Container maxW={'7xl'} py={16} as={Stack} spacing={12} flex="3">
            <Stack spacing={0} align={'center'}>
              <Heading align={'center'}>
                Every developer{' '}
                <Text as={'span'} color={'orange.400'}>
                  has a tab open to Thinker
                </Text>
              </Heading>
              <Text margin={3}>List of posts and comments</Text>
            </Stack>
            <Stack
              borderRadius={15}
              direction={{ base: 'column', md: 'column' }}
              spacing={{ base: 10, md: 1, lg: 10 }}
            >
              {thoughts && (
                <>
                  {thoughts.map(thought => (
                    <Post key={thought._id}>
                      <PostContent>
                        <PostText>{thought.thoughtText}</PostText>
                        <AuthorName>Author: {thought.thoughtAuthor}</AuthorName>
                        <CreatedAt>Created at: {thought.createdAt}</CreatedAt>

                        {!thought.comments.length ? (
                          <Text fontSize="12px" color="tomato">
                            No comments yet...
                          </Text>
                        ) : (
                          <div>
                            {thought.comments.map(comment => (
                              <div key={comment._id}>
                                <CommentText>{comment.commentText}</CommentText>
                                <AuthorName>
                                  Author: {comment.commentAuthor}
                                </AuthorName>
                                <CreatedAt>
                                  Created at: {comment.createdAt}
                                </CreatedAt>
                              </div>
                            ))}
                          </div>
                        )}
                        <RouterLink
                          fontSize="12px"
                          color="tomato"
                          to={`/thoughts/${thought._id}`}
                        >
                          Jump to comment this thought{' '}
                          <ArrowRightIcon margin={2} boxSize={5} />
                        </RouterLink>
                      </PostContent>
                    </Post>
                  ))}
                </>
              )}
            </Stack>
          </Container>
        </Box>
      </Flex>
    </>
  );
}
export default Blog;
