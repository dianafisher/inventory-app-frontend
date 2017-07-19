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
