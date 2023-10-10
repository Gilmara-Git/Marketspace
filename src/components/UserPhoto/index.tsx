import { Image, IImageProps} from 'native-base';
import avatarHolder from '@assets/avatarHolder.png';
import { UserAuthHook } from '@src/hooks/UserAuthHook';
import { api } from '@services/api';

type UserPhotoProps = IImageProps &{
size: number,
borderColor: string;
userAvatar: string;

}

export const UserPhoto = ({size, borderColor,userAvatar,  ...rest}: UserPhotoProps )=>{
    const { user } = UserAuthHook();

    
    return (
        <Image 
            source={userAvatar? { uri: `${api.defaults.baseURL}/images/${userAvatar}`} : avatarHolder}
            alt='User Photo'
            width={size}
            height={size}
            rounded='full'
            borderWidth={2}
            borderColor={borderColor}
            {...rest}
            />
    )
};