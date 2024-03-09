import * as React from 'react';
import PropTypes from 'prop-types';

import { Card, CardActions, CardContent, CardMedia, Tooltip, IconButton, Typography, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EuroIcon from '@mui/icons-material/Euro';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { useUpdateItemMutation } from '../../store/services/medicinedelAPI';
import { useDispatch } from 'react-redux';
import { addMedicine } from '../../store/cart/cartReducer';

export function MedicineCard({ medicine }) {
  const [updateItem] = useUpdateItemMutation();

  const dispatch = useDispatch();

  const handleFavorites = () => {
    updateItem({ _id: medicine._id, favorite: !medicine.favorite });
  };

  function handleAddToCart(id) {
    dispatch(addMedicine({ medicineId: id, quantity: 1 }));
  }

  return (
    medicine && (
      <Card sx={{ padding: 1, maxWidth: 345 }}>
        <CardMedia component='img' alt='alt description' height='140' image={medicine.url} />
        <CardContent>
          <Typography variant='h5'>{medicine.title}</Typography>
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>
            {medicine.price}
            <EuroIcon sx={{ height: '20px', marginLeft: '2px' }} />
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            variant='outlined'
            size='small'
            sx={{ alignSelf: 'flex-end' }}
            onClick={() => handleAddToCart(medicine._id)}
          >
            add to Cart <AddShoppingCartIcon sx={{ marginLeft: '2px' }} />
          </Button>
          <Tooltip title='Add to favorites' arrow>
            <IconButton color='primary' onClick={() => handleFavorites()}>
              {medicine.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    )
  );
}

MedicineCard.propTypes = {
  medicine: PropTypes.object.isRequired,
};
MedicineCard.defaultProps = {
  medicine: null,
};
