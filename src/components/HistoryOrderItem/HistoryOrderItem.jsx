import React from 'react';
import PropTypes from 'prop-types';
import { useGetItemByIdQuery } from '../../store/services/medicinedelAPI';
import { CardMedia, Card, Typography, Box } from '@mui/material';
import EuroIcon from '@mui/icons-material/Euro';

export const HistoryOrderItem = ({ id, quantity }) => {
  const { data: itemById } = useGetItemByIdQuery(id);

  return (
    itemById && (
      <Card sx={{ display: 'flex', margin: 0.5, width: '500px' }}>
        <CardMedia
          component='img'
          alt={`Medicine ${id} picture`}
          image={itemById.url}
          sx={{ height: 80, width: 180, margin: 1 }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginLeft: 1 }}>
          <Typography sx={{ fontWeight: 'bold', marginBottom: 1 }}>{itemById.title}</Typography>
          <Typography sx={{ marginBottom: 1 }}>Ordered: {quantity} pcs</Typography>
          <Typography sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            Price: {quantity * itemById.price} <EuroIcon sx={{ height: '20px', marginLeft: '2px' }} />
          </Typography>
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
