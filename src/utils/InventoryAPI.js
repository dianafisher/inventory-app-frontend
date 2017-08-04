import axios from 'axios';

// const api = "https://lego-inventory-app.herokuapp.com/api";
const api = "http://localhost:5000/api";


export const getItems = (token, pageNumber) => {
  console.log('getItems, token:', token);
  return axios.get(`${api}/items?page=${pageNumber}&token=${token}`)
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

export const getItem = (itemId, token) => {
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

export const upcLookup = (data, token) => {
  return axios.put(`${api}/upc?token=${token}`, data)
    .then(function(response){
      console.log(response);
      return response;
    })
}

export const registerUser = (user) => {
  return axios.post(`${api}/users`, user)
    .then(function(response) {
      return response;
    });
}

export const login = (user) => {
  return axios.post(`${api}/login`, user)
    .then(function(response) {
      return response;
    });
}

export const logout = () => {
  // clear the jwt token from localStorage
  localStorage.setItem('jwt_token', '');
  return axios.get(`${api}/logout`)
    .then(function(response) {
      return response;
    });
}
