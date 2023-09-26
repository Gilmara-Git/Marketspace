import { USER_AUTH_TOKEN } from '@storage/storage.config';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storageSaveUSerToken = async ( token: string)=>{
    await AsyncStorage.setItem(USER_AUTH_TOKEN, token)
};

export const storageGetUserToken = async ()=>{
    const token = await AsyncStorage.getItem(USER_AUTH_TOKEN);
    return token;
};

export const storageDeleteUserToken = async ()=>{
    await AsyncStorage.removeItem(USER_AUTH_TOKEN);
};