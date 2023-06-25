import axios from 'axios';

export const apiWeather = axios.create({
  baseURL: 'https://api.weatherapi.com/v1'
})
