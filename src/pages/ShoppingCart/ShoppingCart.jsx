import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

import FormInput from '../../components/FormInput/FormInput';
import { getCart } from '../../store/cart/cartSelectors';
import { useGetItemsQuery, usePlaceOrderMutation } from '../../store/services/medicinedelAPI';
import { cleanCart } from '../../store/cart/cartReducer';
import OrderList from '../../components/OrderList/OrderList';
import { GoogleMapAddressSelector } from '../../components/GoogleMap/GoogleMap';

export const cartSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Name is too short').max(50, 'Name is too long').required('Name is required'),
  email: Yup.string().email('Email is not valid').required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Phone must only contain digits')
    .min(7, 'Phone is too short')
    .max(12, 'Phone is too long')
    .required('Phone is required'),
  address: Yup.string().min(2, 'Name is too short').max(50, 'Name is too long'),
  quantity: Yup.array(),
});

const initialValues = {
  name: '',
  email: '',
  phone: '',
  address: '',
  orderList: [],
};

export const ShoppingCart = () => {
  const [medicines, setMedicines] = useState(null);
  const [shop, setShop] = useState(null);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetItemsQuery();
  const [placeOrder, { isLoading: isUpdating }, error] = usePlaceOrderMutation();
  const selectedCart = useSelector(getCart);

  useEffect(() => {
    if (data) {
      const displayCartArray = selectedCart.map((cartItem) => {
        if (data) {
          const foundItem = data.find((item) => item._id === cartItem.medicineId);
          if (foundItem) {
            return { ...foundItem, quantity: cartItem.quantity || 0 };
          }
        }
      });
      setShop(displayCartArray[0].shop);
      setMedicines(displayCartArray);

      formik.setValues({ ...formik.values, orderList: selectedCart });
    }
  }, [data, selectedCart]);
  const onSubmit = (values, { resetForm }) => {
    alert(JSON.stringify(values, null, 2));
    console.log(error);
    placeOrder({ ...values, totalPrice: calculateTotalPrice(medicines, formik.values.orderList) });
    dispatch(cleanCart());
    resetForm();
  };

  const formik = useFormik({
    initialValues,
    validationSchema: cartSchema,
    onSubmit,
  });

  const calculateTotalPrice = (medicinesArray, formikOrderList) => {
    return formikOrderList.reduce((sum, item) => {
      const medicine = medicinesArray.find((med) => med._id === item.medicineId);
      if (medicine) {
        return sum + item.quantity * medicine.price;
      } else {
        return sum;
      }
    }, 0);
  };

  return selectedCart.length === 0 ? (
    <Typography
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 800,
        overflow: 'auto',
      }}
    >
      Your cart is empty
    </Typography>
  ) : isLoading ? (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  ) : (
    <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden',
            minHeight: 800,
          }}
        >
          <Box
            sx={{
              flex: '0 1 auto',
              overflow: 'hidden',
              margin: 1,
              padding: 2,
              border: 1,
              borderRadius: 1,
            }}
          >
            <Box sx={{ width: '100%', height: 300 }}>
              {shop && <GoogleMapAddressSelector formik={formik} shop={shop} />}
            </Box>
            <FormInput
              name='name'
              value={formik.values.name}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              type='name'
              label='Name'
              helperText={formik.touched.name && formik.errors.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
            />
            <FormInput
              name='email'
              value={formik.values.email}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              type='email'
              label='Email'
              helperText={formik.touched.email && formik.errors.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
            <FormInput
              name='phone'
              value={formik.values.phone}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              type='phone'
              label='Phone'
              helperText={formik.touched.phone && formik.errors.phone}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
            />
            <FormInput
              name='address'
              value={formik.values.address}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              type='address'
              label='Address'
              helperText={formik.touched.address && formik.errors.address}
              error={formik.touched.address && Boolean(formik.errors.address)}
            />
          </Box>
          <Box
            sx={{
              overflowY: 'auto',
              overflowX: 'hidden',
              width: '100%',
              padding: 1,
              margin: 1,
              border: 1,
              borderRadius: 1,
            }}
          >
            <Box
              sx={{
                width: '100%',
                flex: '2',
                overflowX: 'hidden',
              }}
            >
              {medicines ? (
                <OrderList
                  medicinesArray={medicines}
                  formikOrderList={formik.values.orderList}
                  formikFieldValueHandler={formik.setFieldValue}
                  blurHandler={formik.handleBlur}
                />
              ) : (
                <Typography
                  sx={{
                    verticalAlign: 'middle',
                    textAlign: 'center',
                  }}
                >
                  Your cart is empty
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignSelf: 'end', marginTop: 1, padding: 2 }}>
        <Typography
          sx={{
            display: 'inline-block',
            marginTop: 'auto',
            marginBottom: 'auto',
            marginRight: 4,
          }}
        >
          Total price:
        </Typography>
        <Typography
          sx={{
            marginRight: 4,
            display: 'inline-block',
            marginTop: 'auto',
            marginBottom: 'auto',
          }}
        >
          {formik.values.orderList.length && medicines && calculateTotalPrice(medicines, formik.values.orderList)}
        </Typography>
        <Button variant='outlined' type='submit' sx={{ width: 160, alignSelf: 'end' }}>
          {isUpdating ? <CircularProgress /> : 'Submit'}
        </Button>
      </Box>
    </form>
  );
};
