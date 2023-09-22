import axios, { AxiosError, AxiosInstance } from 'axios';
import { AppError } from '@utils/AppError.js';


const api = axios.create({
    baseURL: 'http://192.168.1.164:3333'
});


api.interceptors.response.use((response)=>{
    console.log('INTERCEPTOR RESPONSE', response)
    // importante retornar esta response, senao a requisicao nao segue
    return response;

}, (error)=> {
    console.log('INTERCEPTOR RESPONSE ERROR', error)
    if(error.response && error.response.data){
        return Promise.reject(new AppError(error.response.data.message))
    }else{
        return Promise.reject(error)

    }
}
)

export { api}; 