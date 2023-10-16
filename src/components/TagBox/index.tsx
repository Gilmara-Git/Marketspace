import { Pressable, IPressableProps, Text, HStack, Icon } from 'native-base';
import { Fontisto } from '@expo/vector-icons';

type TabBoxProps = IPressableProps & {
    title: string,
    isActive: boolean | undefined,
    setProductState: ()=>void;
   
}

export const TagBox =({ isActive, title , setProductState,  ...rest}: TabBoxProps)=>{
    
    return (

        
        <Pressable
                rounded='full'
                bg={isActive ? 'blue.600' : 'gray.300'}
                p={1.5}
                mr={3}
                onPress={()=>setProductState()}
                _pressed={{ bg: 'blue.900'}}
                isPressed={isActive}
                {...rest}
                >
                
                <HStack 
                    alignItems='center'
                >
        
                    <Text 
                        px={2} 
                        fontFamily='heading' 
                        color={isActive? 'white': 'gray.600'}
                        textTransform={'uppercase'}
                        >
                          {title}
                    </Text>
                    {isActive && 
                        <Icon  as={Fontisto} name='close' size={3} color='white' mr={1}/>
                       
                    }
               
                </HStack>
              
            </Pressable>
                        )
                    };