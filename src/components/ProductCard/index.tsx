import { Pressable ,IPressableProps, Image, Box, Text , Heading, View } from 'native-base';
import { UserPhoto } from '@components/UserPhoto';
import sneaker from '@assets/red_sneaker.png';
import chandelier from '@assets/chandelier.png';

import { ImageOverlay } from '@components/ImageOverlay';

type ProductCardProps = IPressableProps & {
    name: string;
    image?: string;
    description?: string;
    price: string;
    isNew: boolean,
    isNotUserAd: boolean
    isAdActive?: boolean

}


export const ProductCard =( { name, price, description, image,  isNew, isNotUserAd, isAdActive, ...rest  }: ProductCardProps)=>{

    return (
      
        <Pressable 
            pb={6}  
            rounded={8} 
            px={2} 
            onPress={()=>console.log('Open Card Details')} 
            {...rest}
        >
            <>

                <View>

                    <Image  
                        rounded={8}
                        source={chandelier} 
                        alt='Product image'
                        />
                    
                    {
                        !isAdActive &&

                        <ImageOverlay rounded={8} />
                }
                </View>
           
                    

                    { !isAdActive && 
                   
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


            { isNotUserAd && 
            
                <UserPhoto  
                    size={6} 
                    borderColor='gray.50'
                    position='absolute'
                    top={1}
                    left={3}
                />
            
            }
      
            <Box 
                bg={ isNew ? 'blue.900' :'gray.800'} 
                rounded='full'
                position='absolute'
                top={1.5}
                right={4}
                px={1.5}
            >
               
                    <Text 
                        px={1} 
                        fontFamily='heading' 
                        color='white'>{isNew ?'New'.toUpperCase(): 'Used'.toUpperCase()}
                    </Text>
                
            </Box>
                    <Text pt={.5} fontFamily='body'fontSize='sm'>{name}</Text>
                    <Text fontFamily='heading' fontSize='md'><Text fontSize='xs'>U$</Text> {price}</Text>

        </Pressable>
      
        
    );
};