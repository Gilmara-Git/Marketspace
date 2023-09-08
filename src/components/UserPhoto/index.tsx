import { Image, IImageProps} from 'native-base';

type UserPhotoProps = IImageProps &{
width: number,
height: number,
borderColor: string

}

export const UserPhoto = ({width, height,borderColor, ...rest}: UserPhotoProps )=>{
    return (
        <Image 
            source={{ uri: 'http://github.com/gilmara-git.png'}}
            alt='User Photo'
            width={width}
            height={height}
            rounded='full'
            borderWidth={2}
            borderColor={borderColor}
            {...rest}
            />
    )
};