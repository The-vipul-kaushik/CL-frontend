import { createSlice } from "@reduxjs/toolkit";
import Tournament from "../models/Tournament";

const TourSlice = createSlice({

    //  name is only one 
    name: 'tour',

    initialState: {
        tourData: new Tournament(),
        tourList: [],
        matchList: []
        // , other objects in state 
    },

    reducers: {

        getTourById: (state, action) => {
            // console.log(action.payload);
            state.tourData = action.payload;
        }, 
        getAllTours: (state, action) => {
                // console.log(state);
                // console.log(action.payload);
                state.tourList = action.payload;
        },
        getAllMatches: (state, action) => {
                // console.log(state);
                // console.log(action.payload);
                state.matchList = action.payload;
        }
        
        // , more methods in reducers   
    }
});

export const { getTourById, getAllTours, getAllMatches } = TourSlice.actions;

export default TourSlice.reducer;