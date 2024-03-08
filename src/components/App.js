import React from 'react';
import { Route, Routes } from 'react-router';

import { Shop } from '../pages/Shop/Shop';
import { Layout } from './Layout/Layout';
import { Coupons } from '../pages/Coupons/Coupons';
import { History } from '../pages/History/History';
import { ShoppingCart } from '../pages/ShoppingCart/ShoppingCart';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Shop />} />
        <Route path='/cart' element={<ShoppingCart />} />
        <Route path='/history' element={<History />} />
        <Route path='/coupons' element={<Coupons />} />
      </Route>
    </Routes>
  );
}

export default App;
