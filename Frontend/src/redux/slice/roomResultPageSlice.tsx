import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Axios } from "../../utils/axios/AxiosInterceptor";
import {
  RequestBody,
  ResponseBody,
  RoomResultPageState,
} from "../../interface/DataInterface";
import { filterType, sortType } from "../../types/DataTypes";
const initialData: RoomResultPageState = {
  loadingStatus: false,
  errorStatus: false,
  filters: [],
  sort: {
    name: "No Sort Applied",
    attribute: "None",
    order: "None",
  },
  pageRange: [],
  requestBody: {
    startDate: "",
    endDate: "",
    roomCount: 0,
    guests: "",
    propertyId: 0,
  },
  fetchedRoomResultList: [],
};
export const fetchAvailableRooms = createAsyncThunk(
  "roomResultPageConfig/fetchAvailableRooms",
  async (reqBody: RequestBody,thunkApi) => {
    thunkApi.dispatch(roomResultPageSlice.actions.setloadingStatus(true));
    const response = await Axios.post("/search-results", reqBody);
    return response.data;
  }
);

/**
 * Crstate.roomResultPageState.requestBodyeate a slice with initial value defined above.
 */
export const roomResultPageSlice = createSlice({
  name: "roomResultPageConfig",
  initialState: initialData,
  reducers: {
    /**
     * Toggle the value of loadingStatus between true and false.
     * @param state redux state or store.
     */
    setloadingStatus: (state,action:PayloadAction<boolean>) => {
      state.loadingStatus = action.payload;
    },
    /**
     * Toggle the value of errorStatus between true and false.
     * @param state redux state or store.
     */
    toggleerrorStatus: (state) => {
      state.errorStatus = !state.errorStatus;
    },
    setSortState: (state, action: PayloadAction<sortType>) => {
      state.sort = action.payload;
    },
    setPageRangeState: (state, action: PayloadAction<number[]>) => {
      state.pageRange = action.payload;
    },
    setRequestBodyState: (state, action: PayloadAction<RequestBody>) => {
      state.requestBody = action.payload;
    },

    setFilterState: (state, action) => {
      const updatedFilters = [...state.filters];
      updatedFilters.push({
        name: action.payload.filter.name,
        attribute: action.payload.filter.attribute,
        values: [action.payload.filterValue],
      });
      state.filters = updatedFilters;
    },
    addFilterState: (state, action) => {
      const updatedFilters = [...state.filters];
      updatedFilters[action.payload.indexOfFilter].values.push(
        action.payload.filterValue
      );
      state.filters = updatedFilters;
    },
    removeFilterState: (state, action) => {
      const updatedFilters = [...state.filters];
      const newValues = updatedFilters[
        action.payload.indexOfFilter
      ].values.filter(
        (newValue: string) => newValue !== action.payload.filterValue
      );
      updatedFilters[action.payload.indexOfFilter].values = newValues;
      const emptyCheckFilters = updatedFilters.filter(
        (filter: filterType) => filter.values.length > 0
      );
      state.filters = emptyCheckFilters;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAvailableRooms.fulfilled,
      (state, action: PayloadAction<ResponseBody[]>) => {
        state.fetchedRoomResultList = action.payload;
        state.loadingStatus = false;
        state.errorStatus = false;
      }
    );
   
    builder.addCase(fetchAvailableRooms.rejected, (state) => {
      state.loadingStatus = false;
      state.errorStatus = true;
    });
  },
});
export const {
  setFilterState,
  setSortState,
  setPageRangeState,
  setRequestBodyState,
  addFilterState,
  removeFilterState,
} = roomResultPageSlice.actions;
export const loadingStatus = (state: RootState) =>
  state.roomResultPageState.loadingStatus;
export const errorStatus = (state: RootState) =>
  state.roomResultPageState.errorStatus;
export const filters = (state: RootState) => state.roomResultPageState.filters;
export const sort = (state: RootState) => state.roomResultPageState.sort;
export const pageRange = (state: RootState) =>
  state.roomResultPageState.pageRange;
export const requestBody = (state: RootState) =>
  state.roomResultPageState.requestBody;
export const fetchedRoomResultList = (state: RootState) =>
  state.roomResultPageState.fetchedRoomResultList;
export default roomResultPageSlice.reducer;
