import React from 'react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { Header } from './Header/Header';

export const Layout = () => {
  return (
    <Container sx={{ height: '100%', backgroundColor: 'blue', overflow: 'scroll' }}>
      <Header />
      <Suspense fallback='loading'>
        <Outlet />
      </Suspense>
    </Container>
  );
};
