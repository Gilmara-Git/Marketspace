import { Image, IImageProps} from 'native-base';

type UserPhotoProps = IImageProps &{

}

export const UserPhoto = ({...rest}: UserPhotoProps )=>{
    return (
        <Image 
            source={{ uri: 'http://github.com/gilmara-git.png'}}
            alt='User Photo'
            width={13}
            height={13}
            rounded='full'
            borderWidth={2}
            borderColor='blue.600'
            {...rest}
            />
    )
};