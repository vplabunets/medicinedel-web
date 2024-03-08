import React from 'react';
import PropTypes from 'prop-types';
import { HistoryOrderItem } from '../HistoryOrderItem/HistoryOrderItem';
import { Box } from '@mui/material';

export const HistoryOrder = ({ orderList }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', width: 500 }}>
    {orderList.map(({ medicineId, quantity }) => (
      <HistoryOrderItem key={medicineId} id={medicineId} quantity={quantity} />
    ))}
  </Box>
);

HistoryOrder.propTypes = {
  orderList: PropTypes.array.isRequired,
};
HistoryOrder.defaultProps = {
  orderList: [],
};
