import React from 'react';
import { Button, Card, CardContent, CardMedia, OutlinedInput, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import EuroIcon from '@mui/icons-material/Euro';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useTheme } from '@mui/material/styles';

export const OrderItem = ({
  item,
  initialValue,
  index,
  selectedItem,
  formikOrderList,
  formikFieldValueHandler,
  blurHandler,
  removeHandler,
  changeQuantityHandler,
}) => {
  const theme = useTheme();
  return (
    <Card key={item._id} sx={{ display: 'flex', marginBottom: 1, marginRight: 1, padding: 1, minWidth: 345 }}>
      <CardMedia component='img' alt='alt description' height='140' image={item.url} />
      <CardContent>
        <Typography variant='h5' sx={{ marginBottom: 1 }}>
          {item.title}
        </Typography>
        <OutlinedInput
          sx={{ height: 40, marginBottom: 1 }}
          name={`quantity[${index}]`}
          value={initialValue}
          onChange={(event) => {
            let newValue = parseInt(event.target.value);
            if (newValue < 0 || isNaN(newValue)) {
              newValue = 0;
            }
            const updatedList = [...formikOrderList];
            if (selectedItem) {
              const itemToUpdate = updatedList.find((element) => element.medicineId === item._id);
              if (itemToUpdate) {
                const updatedItem = { ...itemToUpdate, quantity: newValue };
                const updatedListWithoutItem = updatedList.filter((element) => element.medicineId !== item._id);
                const updatedListWithUpdatedItem = [...updatedListWithoutItem, updatedItem];
                changeQuantityHandler({ medicineId: item._id, quantity: newValue });
                formikFieldValueHandler('orderList', updatedListWithUpdatedItem);
              }
            } else {
              updatedList.push({
                medicineId: item._id,
                quantity: newValue,
              });
              formikFieldValueHandler('orderList', updatedList);
            }
          }}
          onBlur={blurHandler}
          inputProps={{ type: 'number' }}
        />
        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
          Price {item.price}
          <EuroIcon sx={{ height: '20px', marginLeft: '2px' }} />
        </Typography>
      </CardContent>
      <Tooltip title='Remove item from cart'>
        <Button
          sx={{ backgroundColor: theme.palette.grey['100'] }}
          type='button'
          onClick={() => removeHandler({ medicineId: item._id })}
        >
          <DeleteForeverIcon sx={{ width: '30px', marginLeft: '2px' }} />
        </Button>
      </Tooltip>
    </Card>
  );
};

OrderItem.propTypes = {
  medicine: PropTypes.object,
  item: PropTypes.object,
  initialValue: PropTypes.number,
  index: PropTypes.number,
  selectedItem: PropTypes.object,
  formikOrderList: PropTypes.array,
  formikFieldValueHandler: PropTypes.func,
  blurHandler: PropTypes.func,
  removeHandler: PropTypes.func,
  changeQuantityHandler: PropTypes.func,
};
OrderItem.defaultProps = {
  medicine: null,
  item: null,
  initialValue: null,
  index: null,
  selectedItem: null,
  formikOrderList: null,
  formikFieldValueHandler: null,
  blurHandler: null,
  removeHandler: null,
  changeQuantityHandler: null,
};
