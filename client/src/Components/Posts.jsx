import React, { useState } from 'react';
import DrawerPost from './DrawerPost';
import { Link as RouterLink } from 'react-router-dom';
import Auth from '../utils/auth';
import { WarningTwoIcon, AttachmentIcon, InfoIcon } from '@chakra-ui/icons';
import {
  Spinner,
  Heading,
  Stack,
  Text,
  Link,
  Textarea,
  Box,
  Button,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { UPDATE_THOUGHT } from '../utils/mutations';

const Posts = () => {
  let [value, setValue] = React.useState('');

  let handleInputChange = e => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };
  const { loading, error, data } = useQuery(QUERY_ME);
  const [thoughtText, setThoughtText] = useState('');
  const [updateThought, { err }] = useMutation(UPDATE_THOUGHT);

  const handleUpdate = async thoughtId => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      // Call the updateThought mutation
      const { data } = await updateThought({
        variables: {
          thoughtId: thoughtId,
          thoughtText: thoughtText,
        },
      });
      console.log(data);
      // Handle success, e.g., display a success message or update the UI
      console.log('Thought updated:', data.updateThought);

      // Clear the form input
      setThoughtText('');
    } catch (error) {
      // Handle error, e.g., display an error message or handle specific errors
      console.error('Failed to update thought:', error);
    }
  };

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
    return (
      <div>
        Error: {error.message}
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
          <Link as={RouterLink} fontSize={'lg'} fontWeight={900} to="/">
            GO HOME
          </Link>
        </Box>
      </div>
    );
  }

  // Destructure the user data from the response
  const { me } = data;
console.log(me);
  return (
    <>
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
          Welcome{' '}
          <Text as={'span'} color={'orange.400'}>
            {' '}
            {me.username}
          </Text>{' '}
          to your profile
        </Heading>
        <Heading as="h3" size="lg">
          List of your posts
        </Heading>
        <DrawerPost />
        {me && (
          <>
            {me.thoughts.map((thought, index) => (
              <List spacing={3} key={thought._id}>
                <ListItem
                  padding={6}
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="20px"
                >
                  <Text fontSize="2xl">
                    {' '}
                    <ListIcon as={AttachmentIcon} color="green.500" />
                    {thought.thoughtText}
                  </Text>
                  <Text>
                    <InfoIcon margin={2} w={5} h={5} color="blue.500" />
                    Post created at: {thought.createdAt} by {me.username}
                  </Text>
                  {/* <Text>
                    <InfoIcon margin={2} w={5} h={5} color="red.500" />
                    Post updated at: {thought.updatedAt} 
                  </Text> */}
                  <Textarea
                    margin={2}
                    value={thoughtText}
                    onChange={e => setThoughtText(e.target.value)}
                    placeholder="Edit post..."
                    size="sm"
                  />

                  <Button
                    onClick={() => handleUpdate(thought._id)}
                    marginX={2}
                    colorScheme="green"
                  >
                    Edit
                  </Button>
                </ListItem>
              </List>
            ))}
          </>
        )}
      </Stack>
    </>
  );
};
export default Posts;
