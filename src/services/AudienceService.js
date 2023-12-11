import axios from 'axios';

const springBootAppUrl = `http://localhost:8088/`;

const getAudienceByIdService = (aid) => {
    console.log(aid);
    return axios.get(`${springBootAppUrl}audience/get-audience-by-id/${aid}`);
}
const getAllAudiencesService = () => {
    console.log(`getAllAudiencesService`);
    return axios.get(`${springBootAppUrl}audience/get-all-audiences`);
}

const addAudienceService = (audience) => {
    console.log(`addAudienceService`);
    return axios.post(`${springBootAppUrl}audience/add-audience`, audience);
}

const updateAudienceService = (audience) => {
    console.log(`updateAudienceService`);
    return axios.put(`${springBootAppUrl}audience/update-audience`, audience);
}

const getMatchByAudienceIdService = (aid) =>{
    console.log(aid);
    return axios.get(`${springBootAppUrl}audience/get-match-by-audienceId/${aid}`);
}

const getTicketByAudienceIdService = (aid) =>{
    console.log(aid);
    return axios.get(`${springBootAppUrl}audience/get-ticket-by-audienceId/${aid}`);
}

const getPaidAmountForAllTicketsService = () => {
    console.log(`getPaidAmountForAllTicketsService`);
    return axios.get(`${springBootAppUrl}audience/get-total-amount-for-all-tickets`);
}
// add more functionalities here 

export { getAudienceByIdService, getTicketByAudienceIdService, getAllAudiencesService, addAudienceService,getPaidAmountForAllTicketsService, updateAudienceService, getMatchByAudienceIdService};