import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addMedicine: (state, action) => {
      const { payload } = action;
      if (payload && payload.medicineId) {
        const existingMedicine = state.find((medicine) => medicine.medicineId === payload.medicineId);
        if (existingMedicine) {
          const selectedMedicineIndex = state.findIndex((medicine) => medicine.medicineId === payload.medicineId);
          state[selectedMedicineIndex].quantity += payload.quantity;
        } else {
          state.push(payload);
        }
      }
    },
    removeMedicine: (state, action) => {
      if (state.find((medicine) => medicine.medicineId === action.payload.medicineId)) {
        let selectedMedicineIndex = state.findIndex((medicine) => medicine.medicineId === action.payload.medicineId);
        if (state[selectedMedicineIndex].quantity !== 0) {
          state[selectedMedicineIndex].quantity -= action.payload.quantity;
        } else {
          return state.filter((medicine) => medicine.medicineId !== action.payload.medicineId);
        }
      }
    },
    changeQuantity: (state, action) => {
      if (state.find((medicine) => medicine.medicineId === action.payload.medicineId)) {
        let selectedMedicineIndex = state.findIndex((medicine) => medicine.medicineId === action.payload.medicineId);
        if (state[selectedMedicineIndex].quantity !== 0) {
          state[selectedMedicineIndex].quantity = action.payload.quantity;
        } else {
          return state.filter((medicine) => medicine.medicineId !== action.payload.medicineId);
        }
      }
    },
    removeMedicineCompletely: (state, action) => {
      return state.filter((medicine) => medicine.medicineId !== action.payload.medicineId);
    },
    cleanCart: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const { addMedicine, removeMedicineCompletely, removeMedicine, changeQuantity, cleanCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
