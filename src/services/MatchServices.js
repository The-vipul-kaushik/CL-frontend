import axios from 'axios';

const springBootAppUrl = `http://localhost:8088/`;

const getMatchByIdService = (mid) => {
    console.log(mid);
    return axios.get(`${springBootAppUrl}match/get-match-by-id/${mid}`);
}

const getMatchByNameService = (mname) => {
    console.log(mname);
    return axios.get(`${springBootAppUrl}match/get-match-by-name/${mname}`);
}

const getAllMatchesService = () => {
    console.log(`getAllMatchesService`);
    return axios.get(`${springBootAppUrl}match/get-all-matches`);
}

const addMatchService = (match) => {
    console.log(`addMatchService`);
    return axios.post(`${springBootAppUrl}match/add-match`, match);
}

const updateMatchService = (match) => {
    console.log(`updateMatchService`);
    return axios.put(`${springBootAppUrl}match/update-match`, match);
}

// add more functionalities here 
const getAllAudiencesService = () => {
    console.log(`getAllAudiencesService`);
    return axios.get(`${springBootAppUrl}match/get-audience-list`);
}

const getTournamentByMatchIdService = (mid) => {
    console.log(mid);
    return axios.get(`${springBootAppUrl}match/get-tournament-by-matchid/${mid}`);
}

const getAudiencesByMatchIdService = (mid) => {
    console.log(mid);
    return axios.get(`${springBootAppUrl}match/get-audiences-by-matchid/${mid}`);
}

const deleteMatchByIdService = (mid) => {
    console.log(`deleteMatchByIdService`);
    return axios.delete(`${springBootAppUrl}match/delete-match/${mid}`);
};

export {
    getMatchByIdService, getMatchByNameService, getAllMatchesService, addMatchService,
    updateMatchService, getAllAudiencesService, getTournamentByMatchIdService,
    getAudiencesByMatchIdService, deleteMatchByIdService
};