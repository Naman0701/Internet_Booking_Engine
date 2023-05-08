import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BookingPageInterface,
  CheckoutFormPageInterface,
  ConfigurationState,
  HotelData,
  RoomResultData,
} from "../../interface/DataInterface";
import { ConfigAxios } from "../../utils/axios/AxiosInterceptor";
import { RootState } from "../store";

const initialHotelData: HotelData = {
  hotelLogo: "",
  serviceName: "",
  tenantName: "",
  hotelBanner: "",
  maxLengthOfStay: 0,
  property: [],
  languageSupport: [],
  currencySupport: [],
  guests: [],
  maxGuestPerRoom: 4,
  maxBookingRooms: 0,
  bedsPerRoom: 0,
  accessibilities: [],
  guestType:[]
};
const initialRoomResultData: RoomResultData = {
  roomTypes: null,
  sort: [],
  filter: [],
  resultSize: 0,
};
const initialCheckoutPageData: CheckoutFormPageInterface = {
  formConfigData: [],
};
const initialBookingPage: BookingPageInterface = {
  cancelled: "",
};
const initialState: ConfigurationState = {
  landingPageConfigData: initialHotelData,
  roomResultPageConfigData: initialRoomResultData,
  checkoutPageConfigData: initialCheckoutPageData,
  bookingPageConfigData: initialBookingPage,
  configLoading: false,
  configError: false,
};

export const fetchLandingPageConfig = createAsyncThunk(
  "landingPageConfig/fetch",
  async (arg, thunkApi) => {
    thunkApi.dispatch(configurationSlice.actions.setLoadingState(true));
    thunkApi.dispatch(configurationSlice.actions.setErrorState(false));
    const response = await ConfigAxios.get("Landing Page");
    return JSON.parse(response.data[0].Configuration);
  }
);
export const fetchRoomResultPageConfig = createAsyncThunk(
  "roomResultPageConfig/fetch",
  async (arg, thunkApi) => {
    thunkApi.dispatch(configurationSlice.actions.setLoadingState(true));
    thunkApi.dispatch(configurationSlice.actions.setErrorState(false));
    const response = await ConfigAxios.get("Room Result Page");
    return JSON.parse(response.data[0].Configuration);
  }
);

export const fetchCheckoutPageConfig = createAsyncThunk(
  "checkoutPageConfig/fetch",
  async (arg, thunkApi) => {
    thunkApi.dispatch(configurationSlice.actions.setLoadingState(true));
    thunkApi.dispatch(configurationSlice.actions.setErrorState(false));
    const response = await ConfigAxios.get("Checkout Page");
    return JSON.parse(response.data[0].Configuration);
  }
);
export const fetchBookingsPageConfig = createAsyncThunk(
  "bookingsPageConfig/fetch",
  async (arg, thunkApi) => {
    thunkApi.dispatch(configurationSlice.actions.setLoadingState(true));
    thunkApi.dispatch(configurationSlice.actions.setErrorState(false));
    const response = await ConfigAxios.get("Booking Page");
    return JSON.parse(response.data[0].Configuration);
  }
);

export const configurationSlice = createSlice({
  name: "configurationSlice",
  initialState: initialState,
  reducers: {
    setLoadingState: (state, action: PayloadAction<boolean>) => {
      state.configLoading = action.payload;
    },
    setErrorState: (state, action: PayloadAction<boolean>) => {
      state.configError = action.payload;
    },
  },

  extraReducers: (builder) => {
    /**
     * When the backendHealthCheck thunk promise is fulfilled,this extra reducer sets the received value to the store components and and set loadingStatus and errorStatus as false.
     */
    builder
      .addCase(
        fetchLandingPageConfig.fulfilled,
        (state, action: PayloadAction<HotelData>) => {
          state.landingPageConfigData = action.payload;
          state.configLoading = false;
          state.configError = false;
        }
      )
      /**
       * When the backendHealthCheck thunk promise is rejected,this extra reducer sets the loadingStatus as false and errorStatus as true.
       */
      .addCase(fetchLandingPageConfig.rejected, (state, action) => {
        state.configLoading = false;
        state.configError = true;
      });

    builder
      .addCase(
        fetchRoomResultPageConfig.fulfilled,
        (state, action: PayloadAction<RoomResultData>) => {
          state.roomResultPageConfigData = action.payload;
          state.configLoading = false;
          state.configError = false;
        }
      )

      .addCase(fetchRoomResultPageConfig.rejected, (state, action) => {
        state.configLoading = false;
        state.configError = true;
      });

    builder
      .addCase(
        fetchCheckoutPageConfig.fulfilled,
        (state, action: PayloadAction<CheckoutFormPageInterface>) => {
          state.checkoutPageConfigData = action.payload;
          state.configLoading = false;
          state.configError = false;
        }
      )

      .addCase(fetchCheckoutPageConfig.rejected, (state, action) => {
        state.configLoading = false;
        state.configError = true;
      });

    builder
      .addCase(
        fetchBookingsPageConfig.fulfilled,
        (state, action: PayloadAction<BookingPageInterface>) => {
          state.bookingPageConfigData = action.payload;
          state.configLoading = false;
          state.configError = false;
        }
      )

      .addCase(fetchBookingsPageConfig.rejected, (state, action) => {
        state.configLoading = false;
        state.configError = true;
      });
  },
});
export const landingPageConfigData = (state: RootState) =>
  state.configurations.landingPageConfigData;
export const roomResultPageConfigData = (state: RootState) =>
  state.configurations.roomResultPageConfigData;
export const checkoutPageConfigData = (state: RootState) =>
  state.configurations.checkoutPageConfigData;

export const bookingPageConfigData = (state: RootState) =>
  state.configurations.bookingPageConfigData;

export default configurationSlice.reducer;
