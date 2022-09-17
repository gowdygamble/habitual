import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Today from './pages/Today';
import CurrentHabits from './pages/CurrentHabits';
import Tracking from './pages/Tracking';

import { store } from './store';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import SignUp from './pages/SignUp';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="today" element={<Today />} />
          <Route path="current-habits" element={<CurrentHabits />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);