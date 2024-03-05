import React from 'react';
import { Route, Routes } from 'react-router';

import { ShoppingCart } from './ShoppingCart';
import { Shop } from './Shop';
import { Layout } from './Layout';
import { Coupons } from './Coupons';
import { History } from './History';

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
