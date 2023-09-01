import { useState} from 'react'
import { Input as InputNativeBase, IInputProps, HStack, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons'


type InputProps = IInputProps & {

}


export const InputPassword =({ ...rest}: InputProps)=>{
const [ showPassword, setShowPassword ] = useState(false);
const togglePassword = ()=>{
    setShowPassword((prevState)=> !prevState);
}
 
    return (
        <HStack>
            <InputNativeBase
              
                height={13}
                width={69}
                borderRadius={6}
                bg='gray.50'
                borderWidth={0}
                my={3}
                fontFamily='body'
                fontSize='md'
                InputRightElement={
                    <Icon as={Ionicons}
                        name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                        size={5}
                        mr={4}
                        onPress={togglePassword}
                    />

                }
                {...rest}  
                />
        </HStack>
    );
};