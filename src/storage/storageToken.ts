import { USER_AUTH_TOKEN } from '@storage/storage.config';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storageSaveUSerToken = async ( token: string)=>{
    console.log(token, 'token, indo para o storage');
    await AsyncStorage.setItem(USER_AUTH_TOKEN, token)
};

export const storageGetUserToken = async ()=>{
    const token = await AsyncStorage.getItem(USER_AUTH_TOKEN);
    return token;
};