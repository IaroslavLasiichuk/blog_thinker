import { ColorModeScript } from '@chakra-ui/react'
import React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import {
  ChakraProvider,
  theme
} from '@chakra-ui/react'

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();