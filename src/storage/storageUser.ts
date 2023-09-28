import { USER_STORAGE } from '@storage/storage.config';
import { UserDTO } from '@src/dtos/UserDTO';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storageSaveUser = async(user: UserDTO)=>{
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));

};


export const storageGetUser = async() =>{
    
    const storage = await AsyncStorage.getItem(USER_STORAGE);

    const user : UserDTO = storage ? JSON.parse(storage) : {};
    return user;
};

export const storageDeleteUser = async() =>{
    await AsyncStorage.removeItem(USER_STORAGE);
};
