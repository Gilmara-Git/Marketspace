import { createContext, ReactNode, useState, useEffect } from 'react';
import {  useToast } from 'native-base';
import { UserDTO } from 'src/dtos/UserDTO'
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { storageSaveUser, storageGetUser, storageDeleteUser} from '@storage/storageUser';
import { storageSaveUSerToken, storageGetUserToken, storageDeleteUserToken } from '@src/storage/storageToken';
import { storageSaveUserRefreshToken, storageDeleteUserRefreshToken} from '@storage/storageRefreshToken';

type UserContextType = {
    user: UserDTO;
    login: (email: string, password: string)=> Promise<void>;
    signOut: ()=> Promise<void>;
};


type AuthContextProviderProps = {
    children: ReactNode;
    }

export const AuthContext = createContext({} as UserContextType);



export const AuthContextProvider =({children}: AuthContextProviderProps)=>{
    const [ user, setUser] = useState<UserDTO>({} as UserDTO);
    const toast = useToast();
  

    const userAndTokenUpdate = ( user: UserDTO, token: string,)=>{
        // console.log(token, 'token indo para o cabecalho da requisicao')
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(user);
    }

    const storageSaveUserTokenAndRefreshToken = async (user: UserDTO, token: string, refresh_token: string) =>{
        try{
            await storageSaveUser(user);
            await storageSaveUSerToken(token);
            await storageSaveUserRefreshToken(refresh_token);

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
            await storageSaveUserTokenAndRefreshToken(data.user, data.token, data.refresh_token)

         

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
    

    const signOut = async ()=>{

        try{
            setUser({} as UserDTO);
            await storageDeleteUser();
            await storageDeleteUserToken();
            await storageDeleteUserRefreshToken();

        }catch(error){
            if(error instanceof AppError){
                const isAppError = error instanceof AppError;
                toast.show({
                    title: isAppError ? error.message : 'There was an error during Sign Out.',
                    placement: 'top',
                    duration: 5000,
                    bg: 'red.400'
                });
            }
        }

    };

    const loadUserAndTokenStorageData = async()=>{
        const user = await storageGetUser();
        const  token  = await storageGetUserToken();
      

        if(user && token){
            userAndTokenUpdate(user, token);

        }

    }

    useEffect(()=>{
        loadUserAndTokenStorageData();
    }, []);

    useEffect(()=>{
        const sendSignOutToApi = api.registerInterceptorTokenValidation(signOut);

        //clearing this function from memory after application loads
        return ()=>{
            sendSignOutToApi();
        }
    }, [signOut]);

    return <AuthContext.Provider value={{ 
        user, login, signOut }}>

            {children } 
      </AuthContext.Provider>
};