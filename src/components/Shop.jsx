import React from 'react';
import { Box, Button } from '@mui/material';
import { MedicineList } from '../MedicineList/MedicineList';

export const Shop = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#8080801f', padding: 2 }}>
          <Button variant='contained' sx={{ marginBottom: 2, width: 150 }}>
            Drugs 24
          </Button>
          <Button variant='contained'>Pharmacy</Button>
        </Box>
        <Box
          sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'red', width: '100vh', overflow: 'auto' }}
        >
          <MedicineList />
        </Box>
      </Box>
    </Box>
  );
};
