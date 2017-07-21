import axios from 'axios';

const api = "http://localhost:5000/api"; //"https://lego-inventory-app.herokuapp.com";

export const getItems = () => {
  return axios.get(`${api}/items/?page=1`)
    .then(function(response) {
      console.log(response);
      const data = response.data;
      if (data.success) {
        return data.documents;
      } else {
        console.log(data.error);
        return [];
      }
    });
}

export const addItem = (item) => {
  return axios.post(`${api}/items`, item)
    .then(function(response){
      console.log(response);
    })
}

export const upcLookup = (data) => {
  data.collection = 'items';
  console.log(data);
  return axios.put(`${api}/upc`, data)
    .then(function(response){
      console.log(response);
    })
}
