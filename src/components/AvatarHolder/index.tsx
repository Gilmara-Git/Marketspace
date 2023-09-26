import { Image,IImageProps, Box, Button } from 'native-base';
import avatarHolder from '@assets/avatarHolder.png';
import edit from '@assets/edit.png';

type AvatarProps = IImageProps &{
    uponClicking: () => void,
    imageUrl?: string | undefined
}

export const AvatarHolder =({ uponClicking, imageUrl, ...rest } : AvatarProps)=>{

     return (
            <Box>
                
                <Image 
                    source={imageUrl ? {uri: imageUrl } : avatarHolder } 
                    alt='Avatar holder'
                    width={28}
                    height={28}
                    rounded='full'
                    {...rest}
                    />
                <Button 
                    position='absolute' 
                    bottom='-11'
                    right='-22' 
                    borderRadius='full' 
                    bg="transparent"
                    _pressed={{bg: 'blue.600'}}
                    onPress={uponClicking}
                
                >
                    <Image source={edit} alt='Edit Avatar'/>
                </Button>
            </Box>
     )
};