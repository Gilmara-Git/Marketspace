import { createContext, ReactNode, useState } from 'react';
import {  useToast } from 'native-base';
import { UserDTO } from 'src/dtos/UserDTO'
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { storageSaveUser} from '@storage/storageUser';
import { storageSaveUSerToken } from '@src/storage/storageToken';

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
    console.log(user, 'sou o user no arqi=uivo de context')

    const login =  async(email: string, password: string)=>{
       
        try{
            const { data } = await api.post('/sessions/' , { email, password});
            console.log(data, 'response da api.post sessions');
            setUser(data.user);
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

            await storageSaveUser(data.user);
            await storageSaveUSerToken(data.token);


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
    

    return <AuthContext.Provider value={{ 
        user, login }}>

            {children } 
      </AuthContext.Provider>
};