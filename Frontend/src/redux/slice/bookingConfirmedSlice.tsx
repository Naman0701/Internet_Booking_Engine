import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format } from "date-fns";
import { BookingConfirmedInterface } from "../../interface/DataInterface";
import { bookingDetailsType } from "../../types/DataTypes";
import { UtilsAxios, Axios } from "../../utils/axios/AxiosInterceptor";
import { RootState } from "../store";

const initialBookingDetails: bookingDetailsType = {
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
};

const initialState: BookingConfirmedInterface = {
  bookingId: "",
  activeAccordian: "",
  bookingDetails: initialBookingDetails,
  loadingStatus: false,
  errorStatus: false,
  otpVerified: false,
  errorMessage: "",
  emailLoadingStatus: false,
  emailErrorStatus: false,
};
export const generateOtp = createAsyncThunk(
  "generateOtp",
  async (arg, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const bookingDetails: bookingDetailsType =
      state.bookingConfirmedState.bookingDetails;
    const reqBody = {
      bookingId: bookingDetails.bookingId,
      email: bookingDetails.email,
    };

    thunkApi.dispatch(
      bookingConfirmedSlice.actions.setEmailLoadingStatus(true)
    );
    thunkApi.dispatch(bookingConfirmedSlice.actions.setEmailErrorStatus(false));
    const response = await UtilsAxios.post("generate-otp", reqBody);
    return response.data;
  }
);
export const getBookingData = createAsyncThunk(
  "getBookingData",
  async (bookingId: string, thunkApi) => {
    thunkApi.dispatch(bookingConfirmedSlice.actions.setLoadingStatus(true));
    thunkApi.dispatch(bookingConfirmedSlice.actions.setErrorStatus(false));
    const response = await Axios.get(`bookings/booking-details/${bookingId}`);
    return response.data;
  }
);
export const cancelBooking = createAsyncThunk(
  "cancelBooking",
  async (args, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const bookingId: string = state.bookingConfirmedState.bookingId;
    thunkApi.dispatch(bookingConfirmedSlice.actions.resetErrorMessage());
    thunkApi.dispatch(bookingConfirmedSlice.actions.setLoadingStatus(true));
    thunkApi.dispatch(bookingConfirmedSlice.actions.setErrorStatus(false));
    const response = await Axios.post(`bookings/cancel/${bookingId}`);
    return response.data;
  }
);

export const verifyOtp = createAsyncThunk(
  "verifyOtp",
  async (otp: string, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const bookingDetails: bookingDetailsType =
      state.bookingConfirmedState.bookingDetails;
    const reqBody = {
      bookingId: bookingDetails.bookingId,
      email: bookingDetails.email,
      otp: otp,
    };
    thunkApi.dispatch(bookingConfirmedSlice.actions.resetErrorMessage());
    const response = await UtilsAxios.post("verify-otp", reqBody);
    return response.data;
  }
);
export const sendConfirmationEmail = createAsyncThunk(
  "sendConfirmationEmail",
  async (arg, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const bookingDetails: bookingDetailsType =
      state.bookingConfirmedState.bookingDetails;
    const reqBody = {
      bookingId: bookingDetails.bookingId,
      email: bookingDetails.email,
      checkInDate: format(new Date(bookingDetails.checkInDate), "yyyy-MMMM-dd"),
      checkOutDate: format(
        new Date(bookingDetails.checkOutDate),
        "yyyy-MMMM-dd"
      ),
      name: `${bookingDetails.firstName} ${bookingDetails.lastName}`,
      roomType: bookingDetails.roomType,
    };
    thunkApi.dispatch(
      bookingConfirmedSlice.actions.setEmailLoadingStatus(true)
    );
    thunkApi.dispatch(bookingConfirmedSlice.actions.setEmailErrorStatus(false));
    const response = await UtilsAxios.post("send-booking-mail", reqBody);
    return response.data;
  }
);

export const bookingConfirmedSlice = createSlice({
  name: "checkoutSlice",
  initialState: initialState,
  reducers: {
    setBookingId: (state, action: PayloadAction<string>) => {
      state.bookingId = action.payload;
    },
    setActiveAccordian: (state, action: PayloadAction<string>) => {
      state.activeAccordian = action.payload;
    },
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.loadingStatus = action.payload;
    },
    setErrorStatus: (state, action: PayloadAction<boolean>) => {
      state.errorStatus = action.payload;
    },
    setEmailLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.emailLoadingStatus = action.payload;
    },
    setEmailErrorStatus: (state, action: PayloadAction<boolean>) => {
      state.emailErrorStatus = action.payload;
    },
    setOtpVerified: (state, action: PayloadAction<boolean>) => {
      state.otpVerified = action.payload;
    },
    resetErrorMessage: (state) => {
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    /**
     * When the backendHealthCheck thunk promise is fulfilled,this extra reducer sets the received value to the store components and and set loadingStatus and errorStatus as false.
     */
    builder
      .addCase(sendConfirmationEmail.fulfilled, (state, action) => {
        state.emailLoadingStatus = false;
        state.emailErrorStatus = false;
      })
      /**
       * When the backendHealthCheck thunk promise is rejected,this extra reducer sets the loadingStatus as false and errorStatus as true.
       */
      .addCase(sendConfirmationEmail.rejected, (state, action) => {
        state.emailLoadingStatus = false;
        state.emailErrorStatus = true;
      });
    builder
      .addCase(getBookingData.fulfilled, (state, action) => {
        state.bookingDetails = action.payload;
        state.loadingStatus = false;
        state.errorStatus = false;
      })
      /**
       * When the backendHealthCheck thunk promise is rejected,this extra reducer sets the loadingStatus as false and errorStatus as true.
       */
      .addCase(getBookingData.rejected, (state, action) => {
        state.loadingStatus = false;
        state.errorStatus = true;
      });
    builder
      .addCase(generateOtp.fulfilled, (state, action) => {
        state.emailLoadingStatus = false;
        state.emailErrorStatus = false;
      })
      /**
       * When the backendHealthCheck thunk promise is rejected,this extra reducer sets the loadingStatus as false and errorStatus as true.
       */
      .addCase(generateOtp.rejected, (state, action) => {
        state.emailLoadingStatus = false;
        state.emailErrorStatus = true;
      });

    builder
      .addCase(verifyOtp.fulfilled, (state, action) => {
        if (action.payload.message.verified) {
          state.otpVerified = true;
          state.errorMessage = "";
        } else {
          state.errorMessage = "Invalid Otp.";
        }
      })
      /**
       * When the backendHealthCheck thunk promise is rejected,this extra reducer sets the loadingStatus as false and errorStatus as true.
       */
      .addCase(verifyOtp.rejected, (state, action) => {
        state.errorMessage = "Otp Expired.";
      });
      builder.addCase(cancelBooking.fulfilled,(state,action)=>{
        state.bookingDetails.isDeleted=true;
        state.loadingStatus=false;
        state.errorStatus=false;
      })
      .addCase(cancelBooking.rejected,(state)=>{
        state.loadingStatus=false;
        state.errorStatus=true;
      });
  },
});

export const { setBookingId, setActiveAccordian, setOtpVerified } =
  bookingConfirmedSlice.actions;

export const bookingId = (state: RootState) =>
  state.bookingConfirmedState.bookingId;

export const activeAccordian = (state: RootState) =>
  state.bookingConfirmedState.activeAccordian;

export const bookingDetails = (state: RootState) =>
  state.bookingConfirmedState.bookingDetails;

export const loadingStatus = (state: RootState) =>
  state.bookingConfirmedState.loadingStatus;
export const errorStatus = (state: RootState) =>
  state.bookingConfirmedState.errorStatus;
export const emailLoadingStatus = (state: RootState) =>
  state.bookingConfirmedState.emailLoadingStatus;
export const emailErrorStatus = (state: RootState) =>
  state.bookingConfirmedState.emailErrorStatus;
export const otpVerified = (state: RootState) =>
  state.bookingConfirmedState.otpVerified;
export const errorMessage = (state: RootState) =>
  state.bookingConfirmedState.errorMessage;

export default bookingConfirmedSlice.reducer;
