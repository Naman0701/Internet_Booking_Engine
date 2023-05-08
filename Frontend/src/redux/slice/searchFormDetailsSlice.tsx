import { createSlice } from "@reduxjs/toolkit";
import { SearchFormStateInterface } from "../../interface/DataInterface";
import { RootState } from "../store";


const initState:SearchFormStateInterface ={
  
  formDetails: null,
  
};

export const searchFormDetailsSlice = createSlice({
  name: "searchFormDetails",
  initialState: initState,
  reducers: {
    
    setFormDetails: (state, action) => {
      state.formDetails = action.payload;
    },

  },
});

export const { setFormDetails} = searchFormDetailsSlice.actions;

export const formDetails = (state: RootState) => state.searchForm.formDetails;


export default searchFormDetailsSlice.reducer;
