import React from 'react';
import { Grid } from '@mui/material';
import { MedicineCard } from '../components/MedicineCard/MedicineCard';

export const MedicineList = () => {
  return (
    <Grid p={2} container columnSpacing={4} rowSpacing={4}>
      <Grid item xs={2} sm={4} md={4}>
        <MedicineCard />
      </Grid>
      <Grid item xs={2} sm={4} md={4}>
        <MedicineCard />
      </Grid>
      <Grid item xs={2} sm={4} md={4}>
        <MedicineCard />
      </Grid>
      <Grid item xs={2} sm={4} md={4}>
        <MedicineCard />
      </Grid>
      <Grid item xs={2} sm={4} md={4}>
        <MedicineCard />
      </Grid>
      <Grid item xs={2} sm={4} md={4}>
        <MedicineCard />
      </Grid>
      <Grid item xs={2} sm={4} md={4}>
        <MedicineCard />
      </Grid>{' '}
      <Grid item xs={2} sm={4} md={4}>
        <MedicineCard />
      </Grid>{' '}
      <Grid item xs={2} sm={4} md={4}>
        <MedicineCard />
      </Grid>{' '}
      <Grid item xs={2} sm={4} md={4}>
        <MedicineCard />
      </Grid>{' '}
      <Grid item xs={2} sm={4} md={4}>
        <MedicineCard />
      </Grid>
    </Grid>
  );
};
