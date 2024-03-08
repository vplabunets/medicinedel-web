import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  OutlinedInput,
  Tooltip,
  ButtonGroup,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { favoritesSorter } from '../../utils/favoritesSorter.js';
import { favoritesStatuses } from '../../utils/favoritesStatuses.js';
import { useGetItemsQuery } from '../../store/services/medicinedelAPI';
import { MedicineList } from '../../components/MedicineList/MedicineList';

export const Shop = () => {
  const [medicines, setMedicines] = useState(null);
  const [medicinesStatus, setMedicinesStatus] = useState(favoritesStatuses.all);
  const [query, setQuery] = useState('');
  const [shops, setShops] = useState(null);
  const [shop, setShop] = useState(null);
  const [sortDirection, setSortDirection] = useState('down');

  const { data, isLoading } = useGetItemsQuery();

  useEffect(() => {
    if (data) {
      const shopsArray = data.map((item) => item.shop);
      const uniqueShops = shopsArray.filter((item, index) => shopsArray.indexOf(item) === index);
      setShops(uniqueShops);

      if (shop === null) {
        setShop(uniqueShops[0]);
      }
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const sortedArray = favoritesSorter(data);
      const filteredByShopArray = sortedArray.filter((medicine) => medicine.shop === shop);
      let filteredArray = filteredByShopArray.filter((medicine) =>
        medicine.title.toLowerCase().includes(query.toLowerCase())
      );

      if (medicinesStatus === favoritesStatuses.favorites) {
        filteredArray = filteredArray.filter((medicine) => medicine.favorite);
      }
      if (medicinesStatus === favoritesStatuses.nonFavorites) {
        filteredArray = filteredArray.filter((medicine) => !medicine.favorite);
      }

      setMedicines(filteredArray);
    }
  }, [data, query, medicinesStatus, shop]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSortByPrice = () => {
    if (sortDirection === 'down') {
      setMedicines(medicines.sort((a, b) => a.price - b.price));
      setSortDirection('up');
    }
    if (sortDirection === 'up') {
      setMedicines(medicines.sort((a, b) => b.price - a.price));
      setSortDirection('down');
    }
  };
  const handleSortByDate = () => {
    if (sortDirection === 'down') {
      setMedicines(medicines.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
      setSortDirection('up');
    }
    if (sortDirection === 'up') {
      setMedicines(medicines.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      setSortDirection('down');
    }
  };

  const handleFavorites = (status) => {
    setMedicinesStatus(status);
  };

  const handleChooseShop = (shop) => {
    setShop(shop);
  };

  return isLoading ? (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  ) : (
    medicines !== null && shops !== null && (
      <>
        <Box sx={{ display: 'flex', flexDirection: 'row', maxHeight: 800, overflow: 'auto', height: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: 800,
              backgroundColor: '#8080801f',
              padding: 2,
            }}
          >
            {shops.map((shopEl, index) => (
              <Button
                key={index}
                variant={shopEl === shop ? 'contained' : 'outlined'}
                sx={{ marginBottom: 2, width: 150 }}
                onClick={() => handleChooseShop(shopEl)}
              >
                {shopEl}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              padding: 2,
              backgroundColor: 'aqua',
              width: '100%',
              minHeight: 800,
              overflow: 'scroll',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <FormControl fullWidth variant='outlined'>
                <InputLabel htmlFor='filter'>Please, type you medicine query</InputLabel>
                <OutlinedInput
                  id='filter'
                  name='filters'
                  value={query}
                  onChange={handleQueryChange}
                  type='text'
                  label='Please, type you medicine query'
                />
              </FormControl>
              <ButtonGroup sx={{ marginLeft: 1, marginRight: 1 }} variant='outlined' aria-label='Loading button group'>
                <Tooltip title='Show favorites' arrow>
                  <Button
                    variant={medicinesStatus === favoritesStatuses.favorites ? 'contained' : 'outlined'}
                    onClick={() => handleFavorites(favoritesStatuses.favorites)}
                  >
                    {medicinesStatus !== favoritesStatuses.favorites ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </Button>
                </Tooltip>
                <Tooltip title='Show non favorites' arrow>
                  <Button
                    variant={medicinesStatus === favoritesStatuses.nonFavorites ? 'contained' : 'outlined'}
                    onClick={() => handleFavorites(favoritesStatuses.nonFavorites)}
                  >
                    {medicinesStatus === favoritesStatuses.nonFavorites ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </Button>
                </Tooltip>
                <Tooltip title='Show all' arrow>
                  <Button
                    variant={medicinesStatus === favoritesStatuses.all ? 'contained' : 'outlined'}
                    onClick={() => handleFavorites(favoritesStatuses.all)}
                  >
                    All
                  </Button>
                </Tooltip>
              </ButtonGroup>
              <ButtonGroup>
                <Tooltip title='Sort by date' arrow>
                  <Button onClick={() => handleSortByDate()}>date</Button>
                </Tooltip>
                <Tooltip title='Sort by price' arrow>
                  <Button onClick={() => handleSortByPrice()}>price</Button>
                </Tooltip>
              </ButtonGroup>
            </Box>
            <MedicineList medicines={medicines} />
          </Box>
        </Box>
      </>
    )
  );
};
