import axios from 'axios'
const apiURL = process.env.REACT_APP_API_URL

const api = axios.create({
  baseURL: apiURL,
})
const axiosInstance = options => api({
  ...options
})

export default axiosInstance