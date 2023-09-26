import axios, { AxiosError, AxiosInstance } from 'axios';
import { AppError } from '@utils/AppError';


const api = axios.create({
    baseURL: 'http://192.168.1.164:3333'
});


api.interceptors.response.use((response)=>{
    console.log('INTERCEPTOR RESPONSE', response)
    // importante retornar esta response, senao a requisicao nao segue
    return response;

}, (error)=> {
    console.log('INTERCEPTOR RESPONSE ERROR', error)
    console.log('Dentro do AppError', error.response.data.message, 'linha17')
    if(error.response && error.response.data){
        return Promise.reject(new AppError(error.response.data.message))
    }else{
        console.log('Fora do AppError', error)
        return Promise.reject(error)

    }
}
)

export { api}; 