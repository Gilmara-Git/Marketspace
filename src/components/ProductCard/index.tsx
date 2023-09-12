import { Pressable ,IPressableProps, Image, Box, Text } from 'native-base';
import { UserPhoto } from '@components/UserPhoto';
import sneaker from '@assets/red_sneaker.png';

type ProductCardProps = IPressableProps & {
    name: string;
    image: string;
    description?: string;
    price: string;
    isNew: boolean

}


export const ProductCard =( { name, price, description, image,  isNew, ...rest  }: ProductCardProps)=>{

    return (
      
        <Pressable 
            pb={6}  
            rounded={8} 
            px={2} 
            onPress={()=>console.log('Open Card Details')} 
            {...rest}
        >
            <Image 
                rounded={8}
                source={sneaker} 
                alt='Product image'
            />
            <UserPhoto  
                size={6} 
                borderColor='gray.50'
                position='absolute'
                top={1}
                left={3}
            />
      
            <Box 
                bg={ isNew ? 'blue.900' :'gray.800'} 
                rounded='full'
                position='absolute'
                top={1}
                right={4}
                px={2}
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