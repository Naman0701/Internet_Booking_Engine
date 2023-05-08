import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CheckoutState,
  ItenaryDetails,
  PromoDetailsBody,
} from "../../interface/DataInterface";
import { Axios } from "../../utils/axios/AxiosInterceptor";
import { RootState } from "../store";

const initPromoDetails: PromoDetailsBody = {
  title: "",
  description: "",
  priceFactor: 0,
  roomType: "",
};
const initialState: CheckoutState = {
  checkout: false,
  checkoutTime: new Date(new Date().getTime() + 10 * 60 * 1000).getTime(),
  property: "Property 3",
  bookingData: {},
  activeForm: 0,
  country: "India",
  promoDetails: initPromoDetails,
  itenaryDetails: null,
  formInfo: null,
  pushBookingErrorStatus: false,
  pushBookingLoadingStatus: false,
  bookingId: "",
  termsAccepted: false,
  sendSpecialOffer:false,
  getStatusLoadingStatus: false,
  getStatusErrorStatus: false,
};

export const pushBooking = createAsyncThunk(
  "pushBooking",
  async (arg, thunkApi) => {

    const state = thunkApi.getState() as RootState;
    const guests =
      typeof state.checkout.itenaryDetails?.guests === "string"
        ? state.checkout.itenaryDetails?.guests
        : state.checkout.itenaryDetails?.guests.join(",");
    const formData = {
      ...state.checkout.formInfo,
      property_id: state.checkout.property.split(" ")[1],
      guests: guests,
      room_count: state.checkout.itenaryDetails?.roomCount.toString(),
      subtotal: state.checkout.itenaryDetails?.subtotal.toString(),
      taxes: state.checkout.itenaryDetails?.taxes.toString(),
      vat: state.checkout.itenaryDetails?.van.toString(),
      total_for_stay: state.checkout.itenaryDetails?.totalStayPrice.toString(),
      room_type: state.checkout.promoDetails.roomType,
      promo_title: state.checkout.promoDetails.title,
      promo_description: state.checkout.promoDetails.description,
      check_in_date: state.roomResultPageState.requestBody.startDate,
      check_out_date: state.roomResultPageState.requestBody.endDate,
      user_id:state.user.id ,
      send_special_offer:state.checkout.sendSpecialOffer,
    };
    const { exp_mm, exp_yy, cvv, ...formWithoutSensitiveData } = formData;
    thunkApi.dispatch(setPushBookingLoadingStatus(true));
    thunkApi.dispatch(setPushBookingErrorStatus(false));
    const response = await Axios.post("push-booking", formWithoutSensitiveData);
    return response.data;
  }
);

export const getBookingStatus = createAsyncThunk(
  "getBookingStatus",
  async (passedBookingID:string, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    let response = null;
    let count = 0;
    thunkApi.dispatch(setGetStatusLoadingStatus(true));
    thunkApi.dispatch(setGetStatusErrorStatus(false));
    while (count < 50) {
      try {
        response = await Axios.get(
          `bookings/booking-status/${state.checkout.bookingId}`
        );
        return response.data;
      } catch (err) {
        count++;
      }
    }
    return null;
  }
);

export const checkoutSlice = createSlice({
  name: "checkoutSlice",
  initialState: initialState,
  reducers: {
    setCheckout: (state, action: PayloadAction<boolean>) => {
      state.checkout = action.payload;
    },
    setBookingData: (state, action) => {
      state.bookingData = action.payload;
    },
    setActiveForm: (state, action: PayloadAction<number>) => {
      state.activeForm = action.payload;
    },
    setPromoDetails: (state, action: PayloadAction<PromoDetailsBody>) => {
      state.promoDetails = action.payload;
    },
    setCountryState: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    },
    setItenaryDetails: (
      state,
      action: PayloadAction<ItenaryDetails | null>
    ) => {
      state.itenaryDetails = action.payload;
    },
    setFormInfo: (state, action) => {
      state.formInfo = action.payload;
    },
    setPushBookingLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.pushBookingLoadingStatus = action.payload;
    },
    setPushBookingErrorStatus: (state, action: PayloadAction<boolean>) => {
      state.pushBookingErrorStatus = action.payload;
    },

    setGetStatusLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.getStatusLoadingStatus = action.payload;
    },
    setGetStatusErrorStatus: (state, action: PayloadAction<boolean>) => {
      state.getStatusErrorStatus = action.payload;
    },
    setBookingId: (state, action: PayloadAction<string>) => {
      state.bookingId = action.payload;
    },
    setTermsAccepted: (state, action: PayloadAction<boolean>) => {
      state.termsAccepted = action.payload;
    },
    setSendSpecialOffer: (state, action: PayloadAction<boolean>) => {
      state.sendSpecialOffer = action.payload;
    },
    setCheckoutTime: (state) => {
      state.checkoutTime = new Date(
        new Date().getTime() + 10 * 60 * 1000
      ).getTime();
    },
  },
  extraReducers: (builder) => {
    /**
     * When the backendHealthCheck thunk promise is fulfilled,this extra reducer sets the received value to the store components and and set pushBookingLoadingStatus and pushBookingErrorStatus as false.
     */
    builder
      .addCase(getBookingStatus.fulfilled, (state, action) => {
        if (action.payload === null) {
          state.getStatusErrorStatus = true;
          state.getStatusLoadingStatus = false;
          state.bookingId = "error";
        } else if (action.payload.bookingStatus) {
          state.getStatusErrorStatus = false;
          state.getStatusLoadingStatus = false;
          state.bookingId = action.payload.bookingId;
        } else {
          state.getStatusErrorStatus = true;
          state.getStatusLoadingStatus = false;
          state.bookingId = "error";
        }
      })
      .addCase(getBookingStatus.rejected, (state, action) => {
        state.getStatusErrorStatus = true;
        state.getStatusLoadingStatus = false;
        state.bookingId = "error";
      });
    builder.addCase(pushBooking.fulfilled, (state, action) => {    
        
      state.bookingId = action.payload.bookingId;
      state.pushBookingErrorStatus = false;
      state.pushBookingLoadingStatus = false;
    });

    builder.addCase(pushBooking.rejected, (state) => {
      state.bookingId = "error";
      state.pushBookingErrorStatus = true;
      state.pushBookingLoadingStatus = false;
    });
    /**
     * When the backendHealthCheck thunk promise is rejected,this extra reducer sets the pushBookingLoadingStatus as false and pushBookingErrorStatus as true.
     */
  },
});

export const {
  setCheckout,
  setBookingData,
  setPromoDetails,
  setActiveForm,
  setCountryState,
  setItenaryDetails,
  setFormInfo,
  setBookingId,
  setTermsAccepted,
  setCheckoutTime,
  setGetStatusErrorStatus,
  setGetStatusLoadingStatus,
  setPushBookingErrorStatus,
  setPushBookingLoadingStatus,
  setSendSpecialOffer,
} = checkoutSlice.actions;

export const isCheckout = (state: RootState) => state.checkout.checkout;
export const bookingData = (state: RootState) => state.checkout.bookingData;
export const property = (state: RootState) => state.checkout.property;
export const checkoutPromoDetails = (state: RootState) =>
  state.checkout.promoDetails;
export const activeForm = (state: RootState) => state.checkout.activeForm;
export const country = (state: RootState) => state.checkout.country;
export const itenaryDetails = (state: RootState) =>
  state.checkout.itenaryDetails;
export const formInfo = (state: RootState) => state.checkout.formInfo;
export const pushBookingLoadingStatus = (state: RootState) =>
  state.checkout.pushBookingLoadingStatus;
export const pushBookingErrorStatus = (state: RootState) =>
  state.checkout.pushBookingErrorStatus;
export const getStatusErrorStatus = (state: RootState) =>
  state.checkout.getStatusErrorStatus;
export const getStatusLoadingStatus = (state: RootState) =>
  state.checkout.getStatusLoadingStatus;
export const bookingId = (state: RootState) => state.checkout.bookingId;
export const termsAccepted = (state: RootState) => state.checkout.termsAccepted;
export const sendSpecialOffer = (state: RootState) => state.checkout.sendSpecialOffer;
export const checkoutTime = (state: RootState) => state.checkout.checkoutTime;

export default checkoutSlice.reducer;
