
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CommonAppState } from "../../interface/DataInterface";

const initialData: CommonAppState = {
    currentProgress:0
};


/**
 * Create a slice with initial value defined above.
 */
export const commonAppSlice = createSlice({
  name: "commonAppData",
  initialState: initialData,
  reducers: {
    setProgress: (state,action:PayloadAction<number>) => {
      state.currentProgress = action.payload;
    },
  },

});

export const { setProgress } = commonAppSlice.actions;

export const currentProgress = (state: RootState) => state.commonAppDetails.currentProgress;

export default commonAppSlice.reducer;
