import axios from 'axios';

// const api = "https://lego-inventory-app.herokuapp.com/api";
const api = "http://localhost:5000/api";

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

function loadJwtToken() {
  return localStorage.getItem('jwt_token');
}

export const getItems = () => {
  const token = loadJwtToken();
  return axios.get(`${api}/items?page=1&token=${token}`)
    .then(function(response) {
      console.log(response);
      const data = response.data;
      if (data.items) {
        return data.items;
      } else {
        console.log(data.error);
        return [];
      }
    });
}

export const getItem = (itemId) => {
  const token = loadJwtToken();
  return axios.get(`${api}/items/${itemId}?token=${token}`)
    .then(function(response) {
      console.log(response);
      if (response.status !== 200) {
        return {};
      }
      return response.data;
    });
}

export const addItem = (item) => {
  return axios.post(`${api}/items`, item)
    .then(function(response) {
      console.log(response);
    })
}

export const upcLookup = (data) => {
  const token = loadJwtToken();
  console.log(data);
  return axios.put(`${api}/upc?token=${token}`, data)
    .then(function(response){
      console.log(response);
    })
}

export const registerUser = (user) => {
  return axios.post(`${api}/users`, user)
    .then(function(response) {
      let token = response.data.token;
      localStorage.setItem('jwt_token', token);
      const data = parseJwt(token);
      console.log(data);
      console.log(response);
    });
}

export const login = (user) => {
  return axios.post(`${api}/login`, user)
    .then(function(response) {
      let token = response.data.token;
      localStorage.setItem('jwt_token', token);
      const userData = parseJwt(token);
      response.user = userData;
      console.log(response);
      return response;
    });
}

export const logout = () => {
  // clear the jwt token from localStorage
  localStorage.setItem('jwt_token', '');
  return axios.get(`${api}/logout`);
}
