import { createSlice } from "@reduxjs/toolkit";
import Ticket from "../models/Ticket";

const TicketSlice = createSlice({

    //  name is only one 
    name: 'ticket',

    initialState: {
        ticketData: new Ticket(),
        ticketList: []
        // , other objects in state 
    },

    reducers: {

        getTicketById: (state, action) => {
            console.log(action.payload);
            state.ticketData = action.payload;
        }, 
        getAllTickets: (state, action) => {
                console.log(state);
                console.log(action.payload);
                state.ticketList = action.payload;
        }
        
        // , more methods in reducers   
    }
});

export const { getTicketById, getAllTickets } = TicketSlice.actions;

export default TicketSlice.reducer;