import { Image, Box, Button } from 'native-base';
import avatarHolder from '@assets/avatarHolder.png';
import edit from '@assets/edit.png';

export const AvatarHolder =()=>{
     return (
            <Box>
                <Image  source={avatarHolder} alt='Avatar holder'/>
                <Button 
                    position='absolute' 
                    bottom='-11'
                    right='-22' 
                    borderRadius='full' 
                    bg="transparent"
                    _pressed={{bg: 'blue.600'}}
                    onPress={()=>console.log('Do something')}
                
                >
                    <Image source={edit} alt='Edit Avatar'/>
                </Button>
            </Box>
     )
};