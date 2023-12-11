// steps to use redux in react app -
// 1. create store (only one)
// 2. provide the store to index.js
// 3. create slices for components (one for each)
// 4. import methods from slices in components and use them
// note - redux store can be created in multiple different ways.

import { configureStore } from "@reduxjs/toolkit";
import orgReducer from './OrgSlice';
import tourReducer from './TourSlice';
import teamReducer from './TeamSlice';
import matchReducer from './MatchSlice';
import audienceReducer from './AudienceSlice';
import ticketReducer from './TicketSlice';



console.log('store initialized...');

const store = configureStore(
    {
        reducer: {
            org: orgReducer,
            tour: tourReducer,
            
            team: teamReducer,
            match: matchReducer,
            audience: audienceReducer,
            ticket: ticketReducer,

            // , more reducers
        }
    }
);

export default store;
