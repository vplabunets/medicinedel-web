import React, { useEffect, useState } from 'react';
import { useGetOrdersQuery } from '../../store/services/medicinedelAPI';
import { Box, FormControl, InputLabel, OutlinedInput, Typography, Card } from '@mui/material';
import { HistoryOrder } from '../../components/HistoryOrder/HistoryOrder';
import EuroIcon from '@mui/icons-material/Euro';

export const History = () => {
  const { data, isLoading } = useGetOrdersQuery();
  const [query, setQuery] = useState('');
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    if (query === '') {
      setOrders(data);
    } else if (query) {
      const filteredOrders = data.filter((order) => order.email.toLowerCase().includes(query.toLowerCase()));
      setOrders(filteredOrders);
    }
  }, [data, query]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <Box sx={{ margin: 2, maxHeight: 800, overflow: 'auto', height: '100%' }}>
      <>
        <Box>
          <FormControl
            variant='outlined'
            sx={{
              margin: 2,
              alignSelf: 'center',
              width: 400,
              marginY: 1,
            }}
          >
            <InputLabel sx={{}} htmlFor='filter'>
              Please, type email to find orders
            </InputLabel>
            <OutlinedInput
              id='filter'
              name='filters'
              value={query}
              onChange={handleQueryChange}
              type='text'
              label='Please, type you medicine query'
            />
          </FormControl>
        </Box>
        <Box
          sx={{
            border: 1,
            borderRadius: 1,
            margin: 2,
            height: 800,
            overflowY: 'auto',
          }}
        >
          {!isLoading && (
            <Box
              sx={{
                overflowY: 'auto',
                overflowX: 'auto',
              }}
            >
              {orders &&
                orders.map((order) => (
                  <Card
                    key={order._id}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      margin: 1,
                    }}
                  >
                    <HistoryOrder orderList={order.orderList} />
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        margin: 1,
                      }}
                    >
                      <Typography variant='h5' sx={{ display: 'flex', alignItems: 'center' }}>
                        Order price: {order.totalPrice} <EuroIcon sx={{ height: '30px', marginLeft: '2px' }} />
                      </Typography>
                    </Box>
                  </Card>
                ))}
            </Box>
          )}
        </Box>
      </>
    </Box>
  );
};
