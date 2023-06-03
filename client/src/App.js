import About from './Components/About';
import Contact from './Components/Contact';
import Profile from './Components/NewPost';
import Posts from './Components/Posts';
import Layout from './Components/Layout';
import { Route, Routes } from 'react-router-dom';
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
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/posts" element={<Posts/>} />
        <Route path="contact" element={<Contact />} />
      </Routes>
       </ApolloProvider>
    </>
  );
}

export default App;
