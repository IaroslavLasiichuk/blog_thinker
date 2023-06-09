import React from 'react'
import {
    Stack,
    Textarea,
    Button,
    Heading,
    Text,
    Container,
    Spinner,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { useQuery, useMutation } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';

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

const CommentList = () => {
    const { loading, error, data, refetch } = useQuery(QUERY_THOUGHTS);
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
      console.log(thoughts);
    return (
        <>
<h1>sfgs</h1>
      
      </>
       );
}

export default CommentList;