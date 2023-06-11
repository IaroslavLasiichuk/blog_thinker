import React from 'react';
import Home from './Pages/Home';
import CreatePost from './Pages/CreatePost';
import DeletePost from './Pages/DeletePost';
import Thought from './Pages/Thought';
import Chat from './Pages/Chat';
import Contact from './Pages/Contact';
import About from './Pages/About';
import NotFound from './Pages/NotFound';
import Success from './Components/Success';

import { Route, Routes } from 'react-router-dom';
import { ThoughtsProvider } from './utils/ThoughtsContext';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
    <ApolloProvider client={client}>
    <ThoughtsProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<CreatePost />} />
        <Route path="delete" element={<DeletePost/>} />
        <Route path="contact" element={<Contact />} />
        <Route path="chat" element={<Chat />} />
        <Route path="about" element={<About />} />
        <Route path="success" element={<Success />} />
        <Route path="thoughts/:thoughtId" element={<Thought />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </ThoughtsProvider>
       </ApolloProvider>
    </>
  );
}

export default App;
