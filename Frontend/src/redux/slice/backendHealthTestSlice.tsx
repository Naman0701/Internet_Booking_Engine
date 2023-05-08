import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Axios } from "../../utils/axios/AxiosInterceptor";
import { backendHealthCheckState } from "../../interface/DataInterface";

const initialData: backendHealthCheckState = {
  test: "",
  loadingStatus: false,
  errorStatus: false,
};

export const backendHealthCheck = createAsyncThunk(
  "backendHealth/check",
  async (arg, thunkApi) => {
    const response = await Axios.get("/health");

    return JSON.stringify(response.data);
  }
);

/**
 * Create a slice with initial value defined above.
 */
export const statictestSlice = createSlice({
  name: "itemList",
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
  },

  extraReducers: (builder) => {
    /**
     * When the backendHealthCheck thunk promise is fulfilled,this extra reducer sets the received value to the store components and and set loadingStatus and errorStatus as false.
     */
    builder.addCase(
      backendHealthCheck.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.test = JSON.parse(action.payload);
        state.loadingStatus = false;
        state.errorStatus = false;
      }
    );
    /**
     * When the backendHealthCheck thunk promise is rejected,this extra reducer sets the loadingStatus as false and errorStatus as true.
     */
    builder.addCase(backendHealthCheck.rejected, (state, action) => {
      state.loadingStatus = false;
      state.errorStatus = true;
    });
  },
});

export const test = (state: RootState) => state.tester.test;
export const loadingStatus = (state: RootState) => state.tester.loadingStatus;
export const errorStatus = (state: RootState) => state.tester.errorStatus;

export default statictestSlice.reducer;
