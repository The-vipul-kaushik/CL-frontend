import { createSlice } from "@reduxjs/toolkit";
import Team from "../models/Team";

const TeamSlice = createSlice({

    //  name is only one 
    name: 'team',

    initialState: {
        teamData: new Team(),
        teamList: [],
        playerByTeamList: []
        // , other objects in state 
    },

    reducers: {

        getTeamById: (state, action) => {
            // console.log(action.payload);
            state.teamData = action.payload;
        }, 
        getAllTeams: (state, action) => {
                // console.log(state);
                // console.log(action.payload);
                state.teamList = action.payload;
        },
        getAllPlayersByTeam: (state, action) => {
            // console.log(state);
            // console.log(action.payload);
            state.playerByTeamList = action.payload;
    }
        
        // , more methods in reducers   
    }
});

export const { getTeamById, getAllTeams, getAllPlayersByTeam} = TeamSlice.actions;

export default TeamSlice.reducer;