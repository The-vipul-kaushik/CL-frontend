import { createSlice } from "@reduxjs/toolkit";
import Organiser from "../models/Organiser";

const OrgSlice = createSlice({
  //  name is only one
  name: "org",

  initialState: {
    orgData: new Organiser(),
    orgList: [],
    tourList: [],
    // , other objects in state
  },

  reducers: {
    getOrgById: (state, action) => {
      // console.log(action.payload);
      state.orgData = action.payload;
    },
    getAllOrgs: (state, action) => {
      // console.log(state);
      // console.log(action.payload);
      state.orgList = action.payload;
      state.orgList.sort((a, b) => a["organiserId"] - b["organiserId"]);
    },
    getAllToursByOrgId: (state, action) => {
      // console.log(state);
      // console.log(action.payload);
      state.tourList = action.payload;
    },

    // , more methods in reducers
  },
});

export const { getOrgById, getAllOrgs, getAllToursByOrgId } = OrgSlice.actions;

export default OrgSlice.reducer;
