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

  address_1: string;
  city: string;
  country: string;
}

interface CheckoutState {
  billing: Billing;
  shipping: Shipping;
  notes: string;
  coupon:string | null;
  discount:number;
  subtotal:number;
  total:number;
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
 
    address_1: "",
    city: "",
    country: "",
  },
  notes: "",
  coupon:null,
  discount:0,
  subtotal:0,
  total:0
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

   
    setCartTotals(state, action: PayloadAction<{ subtotal: number }>) {
      state.subtotal = action.payload.subtotal;
      state.total = state.subtotal - state.discount;
    },

    // 👉 Apply coupon
    applyCoupon(
      state,
      action: PayloadAction<{ code: string; discount: number }>
    ) {
      state.coupon = action.payload.code;
      state.discount = action.payload.discount;
      state.total = state.subtotal - state.discount;
    },

    // 👉 Remove coupon
    removeCoupon(state) {
      state.coupon = null;
      state.discount = 0;
      state.total = state.subtotal;
    },
  },
});

export const { updateBilling, updateShipping, updateNotes,setCartTotals,applyCoupon,removeCoupon,
 } =
  checkoutSlice.actions;
export default checkoutSlice.reducer;
