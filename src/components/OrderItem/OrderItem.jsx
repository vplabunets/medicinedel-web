import React from 'react';
import { Button, Card, CardContent, CardMedia, OutlinedInput, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';

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
  return (
    <Card key={item._id} sx={{ display: 'flex', marginBottom: 1, marginRight: 1, padding: 1, minWidth: 345 }}>
      <CardMedia component='img' alt='alt description' height='140' image={item.url} />
      <CardContent>
        <Typography sx={{ marginBottom: 1 }}>{item.title}</Typography>
        <OutlinedInput
          sx={{ height: 40, marginBottom: 1 }}
          name={`quantity[${index}]`}
          value={initialValue}
          onChange={(event) => {
            console.log(event);
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
                console.log('first', newValue);
                changeQuantityHandler({ medicineId: item._id, quantity: newValue });
                formikFieldValueHandler('orderList', updatedListWithUpdatedItem);
              }
            } else {
              console.log('second', newValue);

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
        <Typography sx={{ textAlign: 'center' }}>Unit price {item.price}</Typography>
      </CardContent>
      <Tooltip title='Remove item from cart'>
        <Button type='button' onClick={() => removeHandler({ medicineId: item._id })}>
          x
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
};
