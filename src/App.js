import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { BrowserRouter, Switch as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { createAction } from 'dorothy/utils';
import { removeToken } from 'dorothy/utils/callApi';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import theme from './theme';
import Header from './components/partials/Header';
import store from './store';
import { GET_CURRENT_USER_REQUEST } from './components/auth/ducks';
import Verify from './components/auth/Verify';
import RememberPassword from './components/auth/RememberPassword';
import Sell from './components/Sell';
import Post from './components/Post';
import { UPDATE_CART } from './components/duck';
import Cart from './components/Cart';
import User from './components/User';
import EditPost from './components/Post/EditPost';
import Search from './components/Search';
import Admin from './components/Admin';

export default () => {
  useEffect(() => {
    if (window.localStorage.getItem('JWT')) {
      const currentTime = Date.now() / 1000;
      const decode = jwtDecode(window.localStorage.getItem('JWT'));
      if (currentTime > decode.exp) {
        window.localStorage.removeItem('JWT');
        removeToken();
      } else {
        store.dispatch({
          type: GET_CURRENT_USER_REQUEST,
          payload: window.localStorage.getItem('JWT'),
        });
      }
    }
    if (window.localStorage.getItem('carts')) {
      store.dispatch(createAction(UPDATE_CART, JSON.parse(window.localStorage.getItem('carts'))));
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/auth/login" component={Login} />
          <Route path="/auth/register" component={Register} />
          <Route path="/auth/verify" component={Verify} />
          <Route path="/auth/rememberPassword" component={RememberPassword} />
          <Route path="/sell" component={Sell} />
          <Route exact path="/post/:postId" component={Post} />
          <Route path="/post/edit/:postId" component={EditPost} />
          <Route path="/carts" component={Cart} />
          <Route path="/user/" component={User} />
          <Route path="/search" component={Search} />
          <Route path="/admin" component={Admin} />
        </Router>
      </BrowserRouter>
    </ThemeProvider>
  );
};
