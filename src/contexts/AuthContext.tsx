import { createContext, ReactNode, useState, useEffect } from 'react';
import {  useToast } from 'native-base';
import { UserDTO } from 'src/dtos/UserDTO'
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { storageSaveUser, storageGetUser} from '@storage/storageUser';
import { storageSaveUSerToken, storageGetUserToken } from '@src/storage/storageToken';

type UserContextType = {
    user: UserDTO;
    login: (email: string, password: string)=> Promise<void>;
}
type AuthContextProviderProps = {
    children: ReactNode;
    }

export const AuthContext = createContext({} as UserContextType);



export const AuthContextProvider =({children}: AuthContextProviderProps)=>{
    const [ user, setUser] = useState<UserDTO>({} as UserDTO);
    const toast = useToast();
  

    const userAndTokenUpdate = ( user: UserDTO, token: string,)=>{
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(user);
    }

    const storageSaveUserAndToken = async (user: UserDTO, token: string) =>{
        try{
            await storageSaveUser(user);
            await storageSaveUSerToken(token);

        }catch(error){
            if(error instanceof AppError){
                const isAppError =  error instanceof AppError;
                toast.show({
                    title: isAppError ? error.message : 'Error to load user information. Please try again.',
                    placement: 'top',
                    duration: 5000,
                    bg: 'red.400'
                })
            }
        }
    }

    const login =  async(email: string, password: string)=>{
       
        try{
            const { data } = await api.post('/sessions/' , { email, password});
            console.log(data, 'response da api.post sessions');
           
            userAndTokenUpdate(data.user, data.token);
            storageSaveUserAndToken(data.user, data.token)

         

        }catch(error){
            const isAppError = error instanceof AppError; 
            toast.show({
                title: isAppError ? error.message :  'An error occurred during your login. Please try again.',
                placement: 'top',
                duration: 5000,
                bg: 'red.400'
            })
        };

        // //daqui pego o user para atualizar no state, pego o user.id para direcionar o 
        // usario para rota privada
        // pego o token de autenticacao para atualizar o token do usuario 
        // salvo o usuario e o token no storage


    };
    

    const loadUserAndTokenStorageData = async()=>{
        const user = await storageGetUser();
        const token = await storageGetUserToken();

        console.log(user, token,  'user and token from storage')

        if(user && token){
            userAndTokenUpdate(user, token);

        }

    }

    useEffect(()=>{
        loadUserAndTokenStorageData();
    }, [])

    return <AuthContext.Provider value={{ 
        user, login }}>

            {children } 
      </AuthContext.Provider>
};