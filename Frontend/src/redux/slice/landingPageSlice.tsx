import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { LandingPageState } from "../../interface/DataInterface";

const initialData: LandingPageState = {
  eligibleGuest: 0,
  selectedRooms: 1,
  selectedBeds: 1,
  totalMaxGuest: 0,
  loadingStatus: false,
  errorStatus: false,
};

/**
 * Create a slice with initial value defined above.
 */
export const landingPageSlice = createSlice({
  name: "landingPageConfigData",
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
    setEligibleGuest: (state, action: PayloadAction<number>) => {
      state.eligibleGuest = action.payload;
    },
    setSelectedRooms: (state, action: PayloadAction<number | string>) => {
      state.selectedRooms =
        typeof action.payload === "string"
          ? parseInt(action.payload)
          : action.payload;
    },
    setSelectedBeds: (state, action: PayloadAction<number | string>) => {
      state.selectedBeds =
        typeof action.payload === "string"
          ? parseInt(action.payload)
          : action.payload;
    },
    setMaxGuestPerRoom: (state, action: PayloadAction<number>) => {
      state.totalMaxGuest = action.payload;
    },
  },
});
export const {
  setEligibleGuest,
  setSelectedRooms,
  setMaxGuestPerRoom,
  setSelectedBeds,
} = landingPageSlice.actions;

export const loadingStatus = (state: RootState) =>
  state.landingPageState.loadingStatus;
export const errorStatus = (state: RootState) =>
  state.landingPageState.errorStatus;
export const eligibleGuest = (state: RootState) =>
  state.landingPageState.eligibleGuest;
export const selectedRooms = (state: RootState) =>
  state.landingPageState.selectedRooms;
export const totalMaxGuest = (state: RootState) =>
  state.landingPageState.totalMaxGuest;
export const selectedBeds = (state: RootState) =>
  state.landingPageState.selectedBeds;

export default landingPageSlice.reducer;
