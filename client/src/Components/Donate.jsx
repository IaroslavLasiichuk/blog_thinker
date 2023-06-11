import React, { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
const Donate = () => (
  <>
    <form action="/create-checkout-session" method="POST">
      <Button
        type="submit"
        textColor={'black'}
        fontSize={'14'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        textAlign={'center'}
        rounded={'full'}
        px={6}
        colorScheme={'orange'}
        bg={'orange.400'}
        _hover={{ bg: 'orange.500' }}
      >
        Donate
      </Button>
    </form>
  </>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setMessage('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? <Message message={message} /> : <Donate />;
}
