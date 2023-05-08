import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDays } from "date-fns";
import format from "date-fns/format";
import { CalendarState } from "../../interface/DataInterface";
import { Axios } from "../../utils/axios/AxiosInterceptor";
import { RootState } from "../store";

const initialState: CalendarState = {
  startDateStore: format(new Date(), "yyyy-MM-dd"),
  endDateStore: format(addDays(new Date(), 2), "yyyy-MM-dd"),
  displayCalendar: false,
  initialCheckStatus: true,
  minimumNightlyRates: [],
  minimumNightlyRatesLoadingStatus: false,
  minimumNightlyRatesErrorStatus: false,
  minimumNightlyRatesErrorMessage:"",
};

export const fetchMinimumNightlyRate = createAsyncThunk(
  "minimumNightlyRates/fetch",
  async (arg, thunkApi) => {
    try {
      const response = await Axios.get("/minimum-rate");
      return JSON.stringify(response.data);
    } catch (err) {
      throw err;
    }
  }
);

export const calendarSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setDates: (state, action) => {
      state.startDateStore = action.payload.startDate;
      state.endDateStore = action.payload.endDate;
    },
    toggleDisplayCalendar: (state) => {
      state.displayCalendar = !state.displayCalendar;
    },
    negateInitialCheckStatus: (state) => {
      state.initialCheckStatus = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMinimumNightlyRate.pending, (state) => {
        state.minimumNightlyRatesLoadingStatus = true;
        state.minimumNightlyRatesErrorStatus = false;
      })
      .addCase(fetchMinimumNightlyRate.fulfilled, (state, action) => {
        state.minimumNightlyRates = JSON.parse(action.payload);
        state.minimumNightlyRatesLoadingStatus = false;
        state.minimumNightlyRatesErrorStatus = false;
      })
      .addCase(fetchMinimumNightlyRate.rejected, (state, action) => {
        state.minimumNightlyRatesLoadingStatus = false;
        state.minimumNightlyRatesErrorStatus = true;
        state.minimumNightlyRatesErrorMessage = action.error.message;
      });
  }
  

});

export const { setDates, toggleDisplayCalendar, negateInitialCheckStatus } =
  calendarSlice.actions;

export const startDateStore = (state: RootState) =>
  state.calendar.startDateStore;
export const endDateStore = (state: RootState) => state.calendar.endDateStore;
export const displayCalendar = (state: RootState) =>
  state.calendar.displayCalendar;
export const initialCheckStatus = (state: RootState) =>
  state.calendar.initialCheckStatus;
export const minimumNightlyRates = (state: RootState) =>
  state.calendar.minimumNightlyRates;

export default calendarSlice.reducer;
