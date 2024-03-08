import { Box } from '@mui/system';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';

const linksData = [
  { id: 1, to: '', name: 'shop' },
  { id: 2, to: 'cart', name: 'shopping cart' },
  { id: 3, to: 'history', name: 'history' },
  { id: 4, to: 'coupons', name: 'coupons' },
];

export const Header = () => {
  const location = useLocation();

  const defaultTabValue = '/';

  return (
    <Box sx={{ padding: 1, backgroundColor: 'lightgrey' }}>
      <Tabs value={location.pathname !== '/' && location.pathname} defaultValue={defaultTabValue}>
        {linksData.map(({ id, to, name }) => {
          return <Tab key={id} label={name} component={Link} value={`/${to}`} to={`/${to}`} />;
        })}
      </Tabs>
    </Box>
  );
};
