import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Home } from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './Shared/Login';
import { CreateAccount } from './Shared/CreateAccount';
import ResetPassword from './Shared/Reset-Password';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import { Search } from './products.js/search';
import { SingleProduct } from './products.js/SingleProduct';
import { Adresses } from './adress/Adresses';
import { Cart } from './products.js/Cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route  path='/' Component={Home} />
        <Route path='/login' Component={Login} />
        <Route path='/signup' Component={CreateAccount} /> 
        <Route path='/reset-password' Component={ResetPassword} />
        <Route path='/product-search' Component={Search} />
        <Route path='/product/:productId' Component={SingleProduct} />
        <Route path='/address' Component={Adresses} />
        <Route path='/cart' Component={Cart} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
