import React from 'react';
import { OrderItem } from '../OrderItem/OrderItem';
import { useDispatch } from 'react-redux';
import { changeQuantity, removeMedicineCompletely } from '../../store/cart/cartReducer';

export const OrderList = ({ medicinesArray, formikOrderList, blurHandler, formikFieldValueHandler }) => {
  const dispatch = useDispatch();
  const removeHandler = (id) => {
    return dispatch(removeMedicineCompletely(id));
  };
  const changeQuantityHandler = (payload) => {
    return dispatch(changeQuantity(payload));
  };

  return medicinesArray.map((item, index) => {
    const selectedItem = formikOrderList.find((element) => element.medicineId === item._id);
    const initialValue = selectedItem ? selectedItem.quantity : 0;

    return (
      <OrderItem
        key={index}
        item={item}
        initialValue={initialValue}
        index={index}
        selectedItem={selectedItem}
        formikOrderList={formikOrderList}
        formikFieldValueHandler={formikFieldValueHandler}
        blurHandler={blurHandler}
        removeHandler={removeHandler}
        changeQuantityHandler={changeQuantityHandler}
      />
    );
  });
};
export default OrderList;
