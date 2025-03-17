import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

import theme from './theme';
import Login from './components/authentication/login/Login';
import Layout from './components/layout/Layout';
import Overview from './components/overview/Overview';
import Product from './components/product/Product';
import User from './components/user/User';
import Order from './components/order/Order';
import Invoice from './components/invoice/Invoice';
import CreateProduct from './components/product/create/CreateProduct';
import ProductDetail from './components/product/detail/ProductDetail';

import './App.css';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Protected Layout */}
          <Route element={<Layout />}>
            <Route path='/dashboard'>
              <Route index element={<Navigate to='overview' />} />
              <Route path='overview' element={<Overview />} />
              <Route path='product' element={<Product />} />
              <Route path='product/create' element={<CreateProduct />} />
              <Route path='product/detail' element={<ProductDetail />} />
              <Route path='user' element={<User />} />
              <Route path='order' element={<Order />} />
              <Route path='invoice' element={<Invoice />} />
              <Route
                path='analytics'
                element={
                  <div>
                    <p>Analytics</p>
                  </div>
                }
              />
              <Route
                path='settings'
                element={
                  <div>
                    <p>Settings</p>
                  </div>
                }
              />
            </Route>
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
