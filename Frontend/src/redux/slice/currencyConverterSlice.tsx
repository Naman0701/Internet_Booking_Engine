import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CurrencyAxios } from "../../utils/axios/AxiosInterceptor";
import { CurrencyConverterState } from "../../interface/DataInterface";

const initialState: CurrencyConverterState = {
  currencyFactors: [],
  selectedcurrencyFactor: 1,
  selectedCurrency: { currencyIcon: "$", currencyName: "USD" },
  loadingStatus: false,
  errorStatus: false,
};

export const fetchCurrencyFactor = createAsyncThunk(
  "currency/fetch",
  async (arg, thunkApi) => {
    thunkApi.dispatch(currencyConverterSlice.actions.toggleloadingStatus());
    const response = await CurrencyAxios.get("");
    return response.data.rates;
  }
);

/**
 * Create a slice with initial value defined above.
 */
export const currencyConverterSlice = createSlice({
  name: "currencyConverter",
  initialState: initialState,
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
    setSelectedCurrencyFactor: (state, action: PayloadAction<string>) => {
      try {
        state.selectedCurrency = JSON.parse(action.payload);

        state.selectedcurrencyFactor =
          state.currencyFactors[state.selectedCurrency.currencyName];
      } catch {
        state.errorStatus = true;
      }
    },
  },

  extraReducers: (builder) => {
    /**
     * When the backendHealthCheck thunk promise is fulfilled,this extra reducer sets the received value to the store components and and set loadingStatus and errorStatus as false.
     */
    builder
      .addCase(fetchCurrencyFactor.fulfilled, (state, action) => {
        state.currencyFactors = action.payload;
        state.loadingStatus = false;
        state.errorStatus = false;
      })
      /**
       * When the backendHealthCheck thunk promise is rejected,this extra reducer sets the loadingStatus as false and errorStatus as true.
       */
      .addCase(fetchCurrencyFactor.rejected, (state, action) => {
        state.loadingStatus = false;
        state.errorStatus = true;
      });
  },
});

export const currencyFactors = (state: RootState) =>
  state.currencyConverter.currencyFactors;
export const selectedCurrency = (state: RootState) =>
  state.currencyConverter.selectedCurrency;
export const selectedCurrencyFactor = (state: RootState) =>
  state.currencyConverter.selectedcurrencyFactor;
export const loadingStatus = (state: RootState) =>
  state.currencyConverter.loadingStatus;
export const errorStatus = (state: RootState) =>
  state.currencyConverter.errorStatus;

export default currencyConverterSlice.reducer;
export const { setSelectedCurrencyFactor } = currencyConverterSlice.actions;
