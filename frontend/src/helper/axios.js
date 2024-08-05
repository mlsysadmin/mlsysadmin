import axios from "axios";

const MLBROKERAGEAxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true
})

export default MLBROKERAGEAxiosInstance