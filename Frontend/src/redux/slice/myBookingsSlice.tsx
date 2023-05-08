import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bookingDetailsType } from "../../types/DataTypes";
import { Axios } from "../../utils/axios/AxiosInterceptor";
import { RootState } from "../store";

const initialBookingState: bookingDetailsType[] = [
  {
    bookingId: "",
    sessionId: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    cardNumber: "",
    propertyId: "",
    checkInDate: "",
    checkOutDate: "",
    guests: "",
    promoTitle: "",
    promoDescription: "",
    nightlyRate: "",
    subtotal: "",
    taxes: "",
    vat: "",
    totalForStay: "",
    roomType: "",
    mailingAddress1: "",
    country: "",
    state: "",
    zip: "",
    roomsList: [],
    isDeleted: false,
  },
];

const initialState = {
  myBookings: initialBookingState,
  errorStatus: false,
  loadingStatus: false,
};

export const getMyBookings = createAsyncThunk(
  "getMyBookings",
  async (userId: string, thunkApi) => {
    const response = await Axios.get(`bookings/my-bookings/${userId}`);
    return response.data;
  }
);

export const myBookingsSlice = createSlice({
  name: "myBookingsSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyBookings.fulfilled, (state, action) => {
        state.myBookings = action.payload;
        state.loadingStatus = false;
        state.errorStatus = false;
      })
      .addCase(getMyBookings.rejected, (state) => {
        state.loadingStatus = false;
        state.errorStatus = true;
      });
  },
});

export const myBookings = (state: RootState) => state.myBookings.myBookings;
export const loadingStatus = (state: RootState) =>
  state.myBookings.loadingStatus;
export const errorStatus = (state: RootState) => state.myBookings.errorStatus;
export default myBookingsSlice.reducer;