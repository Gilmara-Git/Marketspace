import { HStack, Image,  IImageProps, IconButton, Text } from 'native-base';
import { Entypo } from '@expo/vector-icons';

type ProductImageProps = IImageProps & {
    onRemoveClick: (url: string)=> void;
    url: string
}
export const ProductImage = ({ url, onRemoveClick, ...rest}: ProductImageProps)=>{
  
    return(
        <HStack ml={2}>
                <Image 
                  key={url}
                  source={{uri: url}}
                  width={28} 
                  height={28}
                  mx={1}
                  rounded={4}
                  alt='Product photo'
                  {...rest}
                  />
                  
                  <IconButton 
                    _pressed={{bg: ''}}
                    position='absolute' 
                    top={-5} 
                    right={0}
                    _icon={{ as: Entypo, name:'circle-with-cross', size:3, color: 'red.400'}}
                    onPress={()=>onRemoveClick(url)}
                    />
                    
        </HStack> 
    )
}