import { USER_STORAGE } from '@storage/storage.config';
import { UserDTO } from '@src/dtos/UserDTO';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storageSaveUser = async(user: UserDTO)=>{
    console.log(user, 'token, indo para o storage');
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));

};

