// redux/features/checkout-slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Billing {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  country: string;
  email: string;
  phone: string;
}

interface Shipping {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  country: string;
}

interface CheckoutState {
  billing: Billing;
  shipping: Shipping;
  notes: string;
}

const initialState: CheckoutState = {
  billing: {
    first_name: "",
    last_name: "",
    address_1: "",
    city: "",
    country: "",
    email: "",
    phone: "",
  },
  shipping: {
    first_name: "",
    last_name: "",
    address_1: "",
    city: "",
    country: "",
  },
  notes: "",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    updateBilling(state, action: PayloadAction<Partial<Billing>>) {
      state.billing = { ...state.billing, ...action.payload };
    },
    updateShipping(state, action: PayloadAction<Partial<Shipping>>) {
      state.shipping = { ...state.shipping, ...action.payload };
    },
    updateNotes(state, action: PayloadAction<string>) {
      state.notes = action.payload;
    },
  },
});

export const { updateBilling, updateShipping, updateNotes } =
  checkoutSlice.actions;
export default checkoutSlice.reducer;
