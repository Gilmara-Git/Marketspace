import { Image, IImageProps} from 'native-base';

type UserPhotoProps = IImageProps &{
size: number,
borderColor: string

}

export const UserPhoto = ({size, borderColor, ...rest}: UserPhotoProps )=>{
    return (
        <Image 
            source={{ uri: 'http://github.com/gilmara-git.png'}}
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