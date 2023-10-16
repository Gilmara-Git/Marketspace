import { USER_AUTH_REFRESH_TOKEN } from '@storage/storage.config';
import AsyncStorage from "@react-native-async-storage/async-storage";


export const storageSaveUserRefreshToken = async ( refresh_token: string)=>{
    await AsyncStorage.setItem(USER_AUTH_REFRESH_TOKEN, refresh_token );
};

export const storageGetUserRefreshToken = async ()=>{
    const refresh_token = await AsyncStorage.getItem(USER_AUTH_REFRESH_TOKEN);
    return refresh_token;
};

export const storageDeleteUserRefreshToken = async ()=>{
    await AsyncStorage.removeItem(USER_AUTH_REFRESH_TOKEN);
};