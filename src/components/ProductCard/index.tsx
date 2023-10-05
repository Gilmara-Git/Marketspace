import { Pressable ,IPressableProps, Image, Box, Text , Heading, View } from 'native-base';
import { UserPhoto } from '@components/UserPhoto';
import chandelier from '@assets/chandelier.png';

import { ImageOverlay } from '@components/ImageOverlay';
import { api } from '@services/api';


type ProductCardProps = IPressableProps & {
    id: string,
    name: string;
    price: string;
    is_new: boolean
    is_active: boolean
    imageUrl: string;
  
  

}



export const ProductCard =( {name, price, is_new, is_active,imageUrl,  ...rest  }: ProductCardProps)=>{

    price = String(Number(price)/100);


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
                        source={imageUrl ? {uri:`${api.defaults.baseURL}/images/${imageUrl}`} : chandelier} 
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
                />
            
         
      
            <Box 
                bg={ is_new ? 'blue.900' :'gray.800'} 
                rounded='full'
                position='absolute'
                top={1.5}
                right={4}
                px={1.5}
            >
               
                    <Text 
                        px={1} 
                        fontFamily='heading' 
                        color='white'>{is_new ?'New'.toUpperCase(): 'Used'.toUpperCase()}
                    </Text>
                
            </Box>
                    <Text pt={.5} fontFamily='body'fontSize='sm'>{name}</Text>
                    <Text fontFamily='heading' fontSize='md'><Text fontSize='xs'>U$</Text> {price}</Text>

        </Pressable>
      
        
    );
};