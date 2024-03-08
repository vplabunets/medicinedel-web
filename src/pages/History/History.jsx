import React, { useEffect, useState } from 'react';
import { useGetOrdersQuery } from '../../store/services/medicinedelAPI';
import { Box, FormControl, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { HistoryOrder } from '../../components/HistoryOrder/HistoryOrder';

export const History = () => {
  const { data, isLoading } = useGetOrdersQuery();
  const [query, setQuery] = useState('');
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    if (query === '') {
      setOrders(data);
    } else if (query) {
      const filteredOrderes = data.filter((order) => order.email.toLowerCase().includes(query.toLowerCase()));
      setOrders(filteredOrderes);
    }
  }, [data, query]);

  console.log(orders);
  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };
  return (
    <Box
      sx={{
        margin: 2,
        overflow: 'auto',
        height: '100%',
      }}
    >
      <FormControl variant='outlined' sx={{ alignSelf: 'center', width: 400, marginBottom: 1 }}>
        <InputLabel htmlFor='filter'>Please, type your email to find your orders</InputLabel>
        <OutlinedInput
          id='filter'
          name='filters'
          value={query}
          onChange={handleQueryChange}
          type='text'
          label='Please, type you medicine query'
        />
      </FormControl>
      <Box
        sx={{
          margin: 2,
          height: 800,
          overflowY: 'auto',
        }}
      >
        {!isLoading && (
          <Box
            sx={{
              border: 1,
              borderRadius: 1,
              overflowY: 'auto',
              overflowX: 'auto',
              width: '100%',
            }}
          >
            {orders &&
              orders.map((order) => {
                return (
                  <Box
                    key={order._id}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      margin: 2,
                      border: 1,
                      borderRadius: 1,
                      overflowX: 'hidden',
                    }}
                  >
                    <HistoryOrder orderList={order.orderList} />
                    <Typography sx={{ marginTop: 'auto', marginBottom: 'auto', marginLeft: 1 }}>
                      Total price: {order.totalPrice}
                    </Typography>
                  </Box>
                );
              })}
          </Box>
        )}
      </Box>
    </Box>
  );
};
