import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Axios } from "../../utils/axios/AxiosInterceptor";
import {
  DefaultPromotionState,
  RequestBodyForDeals,
  ResponseBodyForDefaultPromotion,
} from "../../interface/DataInterface";
import { RootState } from "../store";

const initialData:DefaultPromotionState = {
  loadingStatus: false,
  errorStatus: false,
  defaultPromotionsList: [],
  reqBody: {
    startDate: "",
    endDate: "",
    applicableDiscountType: null,
  },
};

export const fetchDefaultPromotions = createAsyncThunk(
  "fetchDefaultPromotions",
  async (reqBody: RequestBodyForDeals) => {
    const response = await Axios.post("/defaultPromotions", reqBody);
    return response.data;
  }
);

/**
 * Crstate.roomResultPageConfig.requestBodyeate a slice with initial value defined above.
 */
export const defaultPromotionsSlice = createSlice({
  name: "defaultPromotions",
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

    setRequestBodyForDealsState: (
      state,
      action: PayloadAction<RequestBodyForDeals>
    ) => {
      state.reqBody = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchDefaultPromotions.fulfilled,
      (state, action: PayloadAction<ResponseBodyForDefaultPromotion[]>) => {
        state.defaultPromotionsList = action.payload;
        state.loadingStatus = false;
        state.errorStatus = false;
      }
    );
    /**
     * When the postBookings chunck promise is rejected, update loadingStatus as false and errorStatus as true.
     */
    builder.addCase(fetchDefaultPromotions.rejected, (state) => {
      state.loadingStatus = false;
      state.errorStatus = true;
    });
  },
});
export const { setRequestBodyForDealsState } = defaultPromotionsSlice.actions;
export const fetchedDefaultPromotionsList = (state: RootState) =>
  state.defaultPromotion.defaultPromotionsList;
export const requestBodyForDeals = (state: RootState) =>
  state.defaultPromotion.reqBody;
export default defaultPromotionsSlice.reducer;
