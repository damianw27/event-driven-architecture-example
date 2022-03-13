import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import reportWebVitals from './reportWebVitals';
import Selection from './pages/selection/selection';
import theme from './theme';
import ProducerPage from './pages/producer/producer-page';
import ListenerPage from './pages/listener/listener-page';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Selection />} />
          <Route path="/producer" element={<ProducerPage />} />
          <Route path="/view" element={<ListenerPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
