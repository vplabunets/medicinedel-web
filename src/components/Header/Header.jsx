import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Button } from '@mui/material';

const linksData = [
  { id: 1, to: '', name: 'shop' },
  { id: 2, to: 'cart', name: 'shopping cart' },
  { id: 3, to: 'history', name: 'history' },
  { id: 4, to: 'coupons', name: 'coupons' },
];

export const Header = () => {
  const [activeLink, setActiveLink] = useState('');

  const handleClick = (to) => {
    setActiveLink(to);
  };

  return (
    <Box sx={{ padding: 1, backgroundColor: 'lightgrey' }}>
      <List>
        {linksData.map(({ id, to, name }) => {
          return (
            <Button
              key={id}
              component={Link}
              to={`/${to}`}
              sx={{
                '&:focus, &:active': {
                  backgroundColor: activeLink === to ? 'lightblue' : 'inherit',
                },
              }}
              onClick={() => handleClick(to)}
            >
              {name}
            </Button>
          );
        })}
      </List>
    </Box>
  );
};
