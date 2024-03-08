import React from 'react';
import PropTypes from 'prop-types';
import { useGetItemByIdQuery } from '../../store/services/medicinedelAPI';
import { CardMedia, Card, Typography, Box } from '@mui/material';

export const HistoryOrderItem = ({ id, quantity }) => {
  const { data: itemById } = useGetItemByIdQuery(id);

  return (
    itemById && (
      <Card sx={{ display: 'flex', padding: 1, margin: 1, maxWidth: 345 }}>
        <CardMedia
          component='img'
          alt='alt description'
          image={itemById.url}
          sx={{ height: 60, width: 130, margin: 1 }}
        />
        <Box>
          <Typography sx={{ fontWeight: 'bold' }}>{itemById.title}</Typography>
          <Typography>ordered:{quantity} pcs</Typography>
          <Typography>total item price:{quantity * itemById.price}</Typography>
        </Box>
      </Card>
    )
  );
};

HistoryOrderItem.propTypes = {
  id: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};

HistoryOrderItem.defaultProps = {
  id: null,
  quantity: 0,
};
