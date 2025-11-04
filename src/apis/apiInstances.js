import axios from "axios";
import CONFIG from "../Constants/apis";


const API_URL = axios.create({
    baseURL: CONFIG.BASE_URL,
    timeout: CONFIG.TIME_OUT
})

API_URL.interceptors.request.use(
    (req) => {
        const token = localStorage.getItem(CONFIG.TOKEN);
        if(token) {
            req.headers[CONFIG.AUTHORIZATION] = `${CONFIG.BEARER} ${token}`;
        }
        return req;
    },
    (error) => { 
        return Promise.reject(error);
    }
);

API_URL.interceptors.response.use(
    response => {       
        if(response.headers[CONFIG.AUTHORIZATION] != undefined){
            localStorage.setItem('token', response.headers[CONFIG.AUTHORIZATION])
        }
        return response
    },
    (error) => { 
        return Promise.reject(error);
    }

)

export default API_URL;