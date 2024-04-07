import axios from 'axios'

const exemplar = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

export default exemplar