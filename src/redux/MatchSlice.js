import { createSlice } from "@reduxjs/toolkit";
import Match from "../models/Match";

const MatchSlice = createSlice({

    name: 'match',

    initialState: {
        matchData: new Match(),
        matchList: []
    },

    reducers: {

        getMatchById: (state, action) => {
            console.log(action.payload);
            state.matchData = action.payload;
        },
        getAllMatches: (state, action) => {
            console.log(state);
            console.log(action.payload);
            state.matchList = action.payload;
        }
    }
});

export const { getMatchById, getAllMatches } = MatchSlice.actions;

export default MatchSlice.reducer;