import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Textarea, Button } from '@chakra-ui/react';

import { ADD_COMMENT } from '../utils/mutations';

import Auth from '../utils/auth';

const CommentForm = ({ thoughtId }) => {
  const [commentText, setCommentText] = useState('');

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          thoughtId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });
      setCommentText('');
    } catch (err) {
      console.error(error);
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'commentText') {
      setCommentText(value);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <form onSubmit={handleFormSubmit}>
            <Textarea
              placeholder="Add your comment..."
              margin={4}
              required
              name="commentText"
              type="text"
              value={commentText}
              onChange={handleChange}
            ></Textarea>
            <Button
              textColor={'black'}
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
              type="submit"
            >
              Add Comment
            </Button>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CommentForm;
