import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@mui/material';
import { MedicineCard } from '../MedicineCard/MedicineCard';

export const MedicineList = ({ medicines }) => {
  return (
    <Grid sx={{ marginY: 1 }} container columnSpacing={4} rowSpacing={4}>
      {medicines.map((medicine) => {
        return (
          <Grid key={medicine._id} item xs={12} sm={6} md={4}>
            <MedicineCard medicine={medicine} />
          </Grid>
        );
      })}
    </Grid>
  );
};

MedicineList.propTypes = {
  medicines: PropTypes.array.isRequired,
};
MedicineList.defaultProps = {
  medicines: null,
};
