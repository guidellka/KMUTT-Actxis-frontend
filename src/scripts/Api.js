import axios from "axios"
import https from 'https'

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    responseType: "json",
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false
    })
})

export default axiosInstance