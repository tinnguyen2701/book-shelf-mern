import React from 'react';
import { BrowserRouter, Switch as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import theme from './theme';
import Header from './components/partials/Header';

export default () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Header />
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/register" component={Register} />
      </Router>
    </BrowserRouter>
  </ThemeProvider>
);
