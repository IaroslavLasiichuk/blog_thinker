import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Flex,
    Container,
    Spinner,
    Heading,
    Stack,
    Text,
    Link,
    Box,
  } from '@chakra-ui/react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { WarningTwoIcon } from '@chakra-ui/icons';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';

const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
    "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
  }
  
const API_KEY = process.env.REACT_APP_GTP_KEY;
const AskGtp = () => {
    const { loading, error, data } = useQuery(QUERY_ME);
    const [messages, setMessages] = useState([
        {
          message: "Hello, I'm ChatGPT! Ask me anything!",
          sentTime: "just now",
          sender: "ChatGPT"
        }
      ]);
      const [isTyping, setIsTyping] = useState(false);
    
      const handleSend = async (message) => {
        const newMessage = {
          message,
          direction: 'outgoing',
          sender: "user"
        };
    
        const newMessages = [...messages, newMessage];
        
        setMessages(newMessages);
    
        // Initial system message to determine ChatGPT functionality
        // How it responds, how it talks, etc.
        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
      };
    
      async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
        // Format messages for chatGPT API
        // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
        // So we need to reformat
    
        let apiMessages = chatMessages.map((messageObject) => {
          let role = "";
          if (messageObject.sender === "ChatGPT") {
            role = "assistant";
          } else {
            role = "user";
          }
          return { role: role, content: messageObject.message}
        });
    
    
        // Get the request body set up with the model we plan to use
        // and the messages which we formatted above. We add a system message in the front to'
        // determine how we want chatGPT to act. 
        const apiRequestBody = {
          "model": "gpt-3.5-turbo",
          "messages": [
            systemMessage,  // The system message DEFINES the logic of our chatGPT
            ...apiMessages // The messages from our chat with ChatGPT
          ]
        }
    
        await fetch("https://api.openai.com/v1/chat/completions", 
        {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(apiRequestBody)
        }).then((data) => {
          return data.json();
        }).then((data) => {
          console.log(data);
          setMessages([...chatMessages, {
            message: data.choices[0].message.content,
            sender: "ChatGPT"
          }]);
          setIsTyping(false);
        });
      }

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
                  to ask Thinker
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
    //   const { me } = data;
    const { me } = data;
    console.log(me);

  return (
    <Flex minHeight="100vh" flexDir="column">
      <Container maxW={'5xl'}  flex="1">
      <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 1, md: 1 }}
          py={{ base: 5, md: 5 }}
        >
      <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
          Hi, {me.username}  Ask{' '}
            <Text as={'span'} color={'orange.400'}>
             Thinker
            </Text>
          </Heading>
          <Text color={'gray.500'} maxW={'3xl'}>
          Welcome to the OpenAI platform
          </Text>
          </Stack>
      <MainContainer style={{ borderRadius: '10px' }}>
        <ChatContainer>
          <MessageList scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}>
            {messages.map((message, i) => {
              console.log(message);
              return <Message key={i} model={message} />;
            })}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
      </Container>
      </Flex>
  );
};

export default AskGtp;
