import axios from 'axios';

const springBootAppUrl = `http://localhost:8088/`;

const getTicketByIdService = (tid) => {
    console.log(tid);
    return axios.get(`${springBootAppUrl}ticket/get-ticket-by-id/${aid}`);
}
const getAllTicketsService = () => {
    console.log(`getAllTicketsService`);
    return axios.get(`${springBootAppUrl}ticket/get-all-tickets`);
}

const addTicketService = (ticket) => {
    console.log(`addTicketService`);
    return axios.post(`${springBootAppUrl}ticket/add-ticket`, ticket);
}

const updateTicketService = (ticket) => {
    console.log(`updateTicketService`);
    return axios.put(`${springBootAppUrl}ticket/update-ticket`, ticket);
}

const deleteTicketService = (tid) => {
    console.log(`deleteTicketService`);
    return axios.delete(`${springBootAppUrl}ticket/delete-ticket/${tid}`);
}

const calculateBillService = (tid) => {
    console.log(`calculateBillService`);
    return axios.get(`${springBootAppUrl}ticket/calculate-bill/${tid}`);
}
// add more functionalities here 

export { calculateBillService, getTicketByIdService, getAllTicketsService, addTicketService, updateTicketService, deleteTicketService};