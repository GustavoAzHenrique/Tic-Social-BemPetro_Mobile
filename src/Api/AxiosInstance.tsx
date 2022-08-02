import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: "http://169.57.150.59:8008"
 });
 
 export default AxiosInstance;