import axios from 'axios';

// const api = "https://lego-inventory-app.herokuapp.com/api";
const api = "http://localhost:5000/api";

export const getItems = (token) => {
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

export const getItem = (token, itemId) => {
  return axios.get(`${api}/items/?{itemId}&token=${token}`)
    .then(function(response) {
      console.log(response);
      const data = response.data;
      if (data.item) {
        return data.item;
      }
    });
}

export const addItem = (token, item) => {
  return axios.post(`${api}/items`, item)
    .then(function(response) {
      console.log(response);
    })
}

export const upcLookup = (token, data) => {
  data.collection = 'items';
  console.log(data);
  return axios.put(`${api}/upc`, data)
    .then(function(response){
      console.log(response);
    })
}

export const registerUser = (user) => {
  return axios.post(`${api}/users`, user)
    .then(function(response) {
      console.log(response);
    });
}

export const login = (user) => {
  return axios.post(`${api}/login`, user)
    .then(function(response) {
      let token = response.data.token;
      localStorage.setItem('jwt_token', token);
      return response.data;
    });
}

export const logout = () => {
  // clear the jwt token from localStorage
  localStorage.setItem('jwt_token', '');
  return axios.get(`${api}/logout`);
}
