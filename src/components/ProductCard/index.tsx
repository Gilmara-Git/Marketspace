import { Pressable ,IPressableProps, Image, Box, Text , Heading, View } from 'native-base';
import { UserPhoto } from '@components/UserPhoto';
import  avatarHolder from  '@assets/avatarHolder.png';

import { ImageOverlay } from '@components/ImageOverlay';
import { api } from '@services/api';


type ProductCardProps = IPressableProps & {
    id: string,
    name: string;
    price: string;
    is_new: string
    is_active: boolean
    imageUrl: string;
    productOwnerAvatar: string
}



export const ProductCard =( {name, price, is_new, is_active,imageUrl, productOwnerAvatar,  ...rest  }: ProductCardProps)=>{

    price = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'} ).format(Number(price)/100);
 
    return (
      
        <Pressable 
            pb={6}  
            rounded={8}
            px={2} 
      
            {...rest}
        >
            <>

                <View 
                    rounded={8}
                    borderColor='gray.50'
                    borderWidth={1} 
                    shadow={0.5}
                >

                    <Image 
                        height={28}
                        width={46} 
                       
                        rounded={8}
                        source={imageUrl ? {uri:`${api.defaults.baseURL}/images/${imageUrl}`} : avatarHolder} 
                        alt='Product image'
                        />
                    
                    {
                        !is_active &&

                        <ImageOverlay rounded={8} />
                }
                </View>
           
                    

                    { !is_active && 
                   
                        <Heading 
                            fontFamily='heading' 
                            fontSize='sm'
                            position='absolute'
                            top={20}
                            left={6}
                            textTransform='uppercase'
                            color='gray.50'
                            >Inactive Ad
                        </Heading>
                   
                    }
            </>


      
            
                <UserPhoto  
                    size={6} 
                    borderColor='gray.50'
                    position='absolute'
                    top={1}
                    left={3}
                    userAvatar={productOwnerAvatar}
                />
            
         
      
            <Box 
                bg={ is_new === 'true' ? 'blue.900' :'gray.800'} 
                rounded='full'
                position='absolute'
                top={1.5}
                right={4}
                px={1.5}
            >
               
                    <Text 
                        px={1} 
                        fontFamily='heading' 
                        color='white'>{is_new === 'true' ?'New'.toUpperCase(): 'Used'.toUpperCase()}
                    </Text>
                
            </Box>
                    <View width={46}>
                    <Text numberOfLines={1} pt={.5} fontFamily='body'fontSize='sm'>{name}</Text>

                    </View>
                    <Text fontFamily='heading' fontSize='md'>{price}</Text>

        </Pressable>
      
        
    );
};