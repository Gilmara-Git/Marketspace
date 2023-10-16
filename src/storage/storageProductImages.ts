import { PRODUCT_IMAGES } from '@storage/storage.config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageSaveProductImages = async(images: any[])=>{
    await AsyncStorage.setItem( PRODUCT_IMAGES, JSON.stringify(images),);

};

export const storageGetProductImages = async()=>{
    const storage = await AsyncStorage.getItem(PRODUCT_IMAGES);
    const images = storage ? JSON.parse(storage) : [];
    return images;
};


export const storageDeleteProductImages = async()=>{
    await AsyncStorage.removeItem(PRODUCT_IMAGES);
};