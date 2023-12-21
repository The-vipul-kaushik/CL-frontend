import axios from "axios";

// const springBootAppUrl = `http://localhost:8088/`;
const springBootAppUrl = `https://apimocha.com/userdb/`;

const registerService = (appUser) => {
  console.log(appUser);
  return axios.post(`${springBootAppUrl}user/register`, appUser);
};

const loginService = (appUser) => {
  console.log(appUser);
  return axios.post(`${springBootAppUrl}user/login`, appUser);
};

export { registerService, loginService };
