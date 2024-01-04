import axios from 'axios';

const springBootAppUrl = `http://localhost:8088/`;

const getTourByIdService = (tid) => {
    // console.log(tid);
    return axios.get(`${springBootAppUrl}tour/get-tournament-by-id/${tid}`);
}
const getAllToursService = () => {
    // console.log(`getAllTournamentsService`);
    return axios.get(`${springBootAppUrl}tour/get-all-tournaments`);
}

const addTourService = (tour) => {
    // console.log(`addTourService`);
    return axios.post(`${springBootAppUrl}tour/insert-tournament`, tour);
}

const updateTourService = (tour) => {
    // console.log(`updateTourService`);
    return axios.put(`${springBootAppUrl}tour/update-tournament`, tour);
}

// add more functionalities here 
const getMatchesByTourIdService = (tid) => {
    // console.log(tid);
    return axios.get(`${springBootAppUrl}tour/get-all-matches-by-tournamentId/${tid}`);
}

export { getTourByIdService, getAllToursService, addTourService, updateTourService, getMatchesByTourIdService};