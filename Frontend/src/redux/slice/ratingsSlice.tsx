import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestBodyForReview } from "../../interface/DataInterface";
import { Axios } from "../../utils/axios/AxiosInterceptor";
import { RootState } from "../store";

const initState = {
  ratingRequest: {} as RequestBodyForReview,
  loadingStatus: false,
  errorStatus: false,
  responseMessage: "",
  isSubmitted:false
};

export const postRatingResponse = createAsyncThunk(
  "postRatingResponse",
  async (reqBody:RequestBodyForReview) => {
    const response = await Axios.post("/rating",reqBody);
    return response.data;
  }
);

export const ratingsSlice = createSlice({
  name: "rating",
  initialState: initState,
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
  },
  extraReducers: (builder) => {
    builder.addCase(
      postRatingResponse.fulfilled,
      (state, action) => {
        state.responseMessage = action.payload;
        state.loadingStatus = false;
        state.errorStatus = false;
        state.isSubmitted=true;
      }
    );

    builder.addCase(postRatingResponse.rejected, (state) => {
      state.loadingStatus = false;
      state.errorStatus = true;
    });
  },
});
export const fetchedRatingResponse = (state: RootState) =>
  state.rating.responseMessage;
export const ratingErrorStatus = (state: RootState) =>
state.rating.errorStatus;
export const ratingSubmitted = (state: RootState) =>state.rating.isSubmitted;
export default ratingsSlice.reducer;
