import axios from 'axios';

const api = "http://localhost:5000/api"; //"https://lego-inventory-app.herokuapp.com";

const headers = {
  'Accept': 'application/json',
  "collectionName": "items",
  "numberDocs": 10
}

export const getAll = () =>
  fetch(`${api}/getDocs`, {
    method: 'POST',
    headers: {
      ...headers
    },
    body: JSON.stringify({
      collectionName: 'items',
      numberDocs: 10
    })
  }).then(res => res.json())
    .then(data => data.documents)


export const getDocs = () =>
  axios.post(`${api}/getDocs`, {
    collectionName: 'items',
    numberDocs: 10
  }).then(function(response) {
    console.log(response);
    return response;
  }).catch(function(error) {
    console.log(error);
  });

export const getItems = () => {
  return axios.get(`${api}/items`)
    .then(function(response) {
      console.log(response);
      return response.data;
    });
}
