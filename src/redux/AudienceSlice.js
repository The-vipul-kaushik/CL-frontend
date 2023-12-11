import { createSlice } from "@reduxjs/toolkit";
import Audience from "../models/Audience";

const AudienceSlice = createSlice({

    //  name is only one 
    name: 'audience',

    initialState: {
        audienceData: new Audience(),
        audienceList: []
        // , other objects in state 
    },

    reducers: {

        getAudienceById: (state, action) => {
            console.log(action.payload);
            state.audienceData = action.payload;
        }, 
        getAllAudiences: (state, action) => {
                console.log(state);
                console.log(action.payload);
                state.audienceList = action.payload;
        }
        
        // , more methods in reducers   
    }
});

export const { getAudienceById, getAllAudiences } = AudienceSlice.actions;

export default AudienceSlice.reducer;