import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Axios } from "../../utils/axios/AxiosInterceptor";
import {
  ResponseBodyForCustomPromotion,
} from "../../interface/DataInterface";
import { RootState } from "../store";
import { errorResponse, requestBodyForCustomPromotion } from "../../types/DataTypes";

const initialData = {
  loadingStatus: false,
  errorStatus: false,
  errorMessage:"",
  customPromotion: {} as ResponseBodyForCustomPromotion,
  reqBody: {
    startDate: "",
    endDate: "",
    promoCode: "",
    roomType: "",
  },
  isApplicable:false
};

export const fetchCustomPromotion = createAsyncThunk(
  "fetchCustomPromotion",
  async (reqBody: requestBodyForCustomPromotion) => {
    try {
      const response = await Axios.post("/customPromotion", reqBody);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);
/**
 * Crstate.roomResultPageConfig.requestBodyeate a slice with initial value defined above.
 */
export const customPromotionSlice = createSlice({
  name: "customPromotion",
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

    setRequestBodyForCustomPromotion: (
      state,
      action: PayloadAction<requestBodyForCustomPromotion>
    ) => {
      state.reqBody = action.payload;
    },
    setIsApplicable:(state,action) => {
        state.isApplicable = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchCustomPromotion.fulfilled,
      (state, action: PayloadAction<ResponseBodyForCustomPromotion|errorResponse | any>) => {
        if(action.payload.promoCode!==undefined)
        {
        state.customPromotion = action.payload;
        state.isApplicable=true;
        state.loadingStatus = false;
        state.errorStatus = false;
        }
        else{
          state.loadingStatus = false;
        state.isApplicable = false;
        state.errorStatus = true;
        state.errorMessage = action.payload.errorMessage;
        }
      }
    );
  },
});
export const { setRequestBodyForCustomPromotion,setIsApplicable } =
  customPromotionSlice.actions;
export const fetchedCustomPromotion = (state: RootState) =>
  state.customPromotion.customPromotion;
export const isCustomPromotionApplicable =(state: RootState)=>state.customPromotion.isApplicable;
export const customPromotionRequestBody = (state: RootState) =>
  state.customPromotion.reqBody;
export const errorStatusCustomPromotion = (state: RootState) =>
  state.customPromotion.errorStatus;
  export const errorMessage = (state: RootState) =>
  state.customPromotion.errorMessage;
  export const isApplicable = (state: RootState) =>
  state.customPromotion.isApplicable;
  
export default customPromotionSlice.reducer;
