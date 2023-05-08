import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Axios } from "../../utils/axios/AxiosInterceptor";
import {
  RequestBodyForDailyPriceBreakdown,
  ResponseBodyForDailyPriceBreakdown,
} from "../../interface/DataInterface";
import { RootState } from "../store";

const initialData = {
  loadingStatus: false,
  errorStatus: false,
  priceBreakdownList: {} as ResponseBodyForDailyPriceBreakdown,
  reqBody: {
    startDate: "",
    endDate: "",
    roomCount: 0,
    propertyId: 0,
    roomType:"",
  },
};

export const fetchPriceBreakdown = createAsyncThunk(
  "fetchPriceBreakdown",
  async (reqBody:RequestBodyForDailyPriceBreakdown) => {
    const response = await Axios.post(
      "/priceBreakDown",
      reqBody
    );
    return response.data;

  }
);

/**
 * Crstate.roomResultPageConfig.requestBodyeate a slice with initial value defined above.
 */
export const priceBreakdownSlice= createSlice({
  name: "priceBreakdown",
  initialState: initialData,
  reducers: {
    /**
     * Toggle the value of loadingStatus between true and false.
     * @param state redux state or store.
     */
    toggleloadingStatus: (state) => {
      state.loadingStatus = !state.loadingStatus;
    },
    /**
     * Toggle the value of errorStatus between true and false.
     * @param state redux state or store.
     */
    toggleerrorStatus: (state) => {
      state.errorStatus = !state.errorStatus;
    },

    setRequestBodyForPriceBreakdown: (
      state,
      action: PayloadAction<RequestBodyForDailyPriceBreakdown>
    ) => {
      state.reqBody = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchPriceBreakdown.fulfilled,
      (state, action: PayloadAction<ResponseBodyForDailyPriceBreakdown>) => {
        state.priceBreakdownList = action.payload;
        state.loadingStatus = false;
        state.errorStatus = false;
      }
    );
    /**
     * When the postBookings chunck promise is rejected, update loadingStatus as false and errorStatus as true.
     */
    builder.addCase(fetchPriceBreakdown.rejected, (state) => {
      state.loadingStatus = false;
      state.errorStatus = true;
    });
  },
});
export const { setRequestBodyForPriceBreakdown } = priceBreakdownSlice.actions;
export const fetchedPriceBreakdownList = (state: RootState) =>
  state.priceBreakdown.priceBreakdownList;
export const requestBodyForPriceBreakdown = (state: RootState) =>
  state.priceBreakdown.reqBody;
export default priceBreakdownSlice.reducer;
