import axios from 'axios';

const springBootAppUrl = `http://localhost:8088/`;

const getTeamByIdService = (tid) => {
    // console.log(tid);
    return axios.get(`${springBootAppUrl}team/get-team-by-id/${tid}`);
}

const getTeamByNameService = (tname) => {
    // console.log(tname);
    return axios.get(`${springBootAppUrl}team/get-team-by-name/${tname}`);
}

const getAllTeamsService = () => {
    // console.log(`getAllTeamsService`);
    return axios.get(`${springBootAppUrl}team/get-all-teams`);
}

const addTeamService = (team) => {
    // console.log(`addTeamService`);
    // console.log(team);
    return axios.post(`${springBootAppUrl}team/add-team`, team);
}

const updateTeamService = (team) => {
    // console.log(`updateTeamService`);
    return axios.put(`${springBootAppUrl}team/update-team`, team);
}

// add more functionalities here 
const getAllPlayersService = () => {
    // console.log(`getAllPlayersService`);
    return axios.get(`${springBootAppUrl}team/get-all-players`);
}

const getPlayersByTeamIdService = (tid) => {
    // console.log(tid);
    return axios.get(`${springBootAppUrl}team/get-all-players-by-team/${tid}`);
}

const deleteTeamByIdService = (tid) => {
    // console.log(`deleteTeamByIdService`);
    return axios.delete(`${springBootAppUrl}team/delete-team/${tid}`);
};

export {
    getTeamByIdService, getTeamByNameService, getAllTeamsService, addTeamService,
    updateTeamService, getAllPlayersService, getPlayersByTeamIdService, deleteTeamByIdService
};