import axios from 'axios';

const springBootAppUrl = `http://localhost:8088/`;

const getOrgByIdService = (oid) => {
    console.log(oid);
    return axios.get(`${springBootAppUrl}org/get-organiser-by-id/${oid}`);
}
const getAllOrgsService = () => {
    console.log(`getAllOrganisersService`);
    return axios.get(`${springBootAppUrl}org/get-all-organisers`);
}

const addOrgService = (org) => {
    console.log(`addOrgService`);
    return axios.post(`${springBootAppUrl}org/insert-org`, org);
}

const updateOrgService = (org) => {
    console.log(`updateOrgService`);
    return axios.put(`${springBootAppUrl}org/update-org`, org);
}

// add more functionalities here 
const getToursByOrgIdService = (oid) => {
    console.log(oid);
    return axios.get(`${springBootAppUrl}org/get-tournaments-by-organiserId/${oid}`);
}

export { getOrgByIdService, getAllOrgsService, addOrgService, updateOrgService, getToursByOrgIdService};