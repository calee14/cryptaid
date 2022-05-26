import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { MoralisProvider } from 'react-moralis';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';

const theme = extendTheme({
  config: {
    initialColorMode: 'light' // switch to 'dark' for dark theme :)
  },
  colors: {
    aidRed: {
      100: '#FED7D7',
      200: '#FEB2B2',
      300: '#E53E3E',
      400: '#F56565',
      500: '#F56565',
      600: '#F56565',
      700: '#F56565',
      900: '#F56565',
    },
  },
});

const appId = process.env.REACT_APP_APP_ID;
const serverUrl = process.env.REACT_APP_SERVER_URL;

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl} initializeOnMount={true}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </MoralisProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();