import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import {
  ChakraProvider,
  theme
} from '@chakra-ui/react';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <ColorModeScript />
    <Router>
      <Routes>
        <Route path='/*' element={<App />}></Route>
      </Routes>
      </Router>
      </ChakraProvider>
  </React.StrictMode>
);