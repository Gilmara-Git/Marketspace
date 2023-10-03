import { Image, IImageProps} from 'native-base';
import avatarHolder from '@assets/avatarHolder.png';
import { UserAuthHook } from '@src/hooks/UserAuthHook';
import { api } from '@services/api';

type UserPhotoProps = IImageProps &{
size: number,
borderColor: string

}

export const UserPhoto = ({size, borderColor, ...rest}: UserPhotoProps )=>{
    const { user } = UserAuthHook();
    
    return (
        <Image 
            source={user.avatar? { uri: `${api.defaults.baseURL}/images/${user.avatar}`} : avatarHolder}
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