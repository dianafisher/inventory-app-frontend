import axios from 'axios';

// const api = "https://lego-inventory-app.herokuapp.com/api";
const api = "http://localhost:5000/api";


export const getItems = (token, pageNumber, limit) => {
  console.log('getItems, token:', token);
  return axios.get(`${api}/items?page=${pageNumber}&limit=${limit}&token=${token}`)
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(err => {
      console.log(err);
      console.log(err.response);
      return err.response;
    })
}

export const getBrands = (token) => {
  return axios.get(`${api}/brands?token=${token}`)
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(err => {
      console.log(err);
      console.log(err.response);
      return err.response;
    })
}

export const getItemsByBrand = (token, brand, pageNumber, limit) => {
  const encodedBrand = encodeURIComponent(brand);
  return axios.get(`${api}/brands/items?brand=${encodedBrand}&page=${pageNumber}&limit=${limit}&token=${token}`)
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(err => {
      console.log(err);
      return err.response;
    })
}

export const getItem = (itemId, token) => {
  return axios.get(`${api}/items/${itemId}?token=${token}`)
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(err => {
      console.log(err);
      console.log(err.response);
      return err.response;
    })
}

export const addItem = (item) => {
  return axios.post(`${api}/items`, item)
    .then(function(response) {
      console.log(response);
    })
}

export const editItem = (itemId, token, data) => {
  return axios.put(`${api}/items/${itemId}?token=${token}`, data)
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(err => {
      console.log('error', err);
    })
}

export const deleteItem = (itemId, token) => {
  return axios.delete(`${api}/items/${itemId}?token=${token}`)
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(err => {
      console.log('error', err);
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
