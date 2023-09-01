import { Input as InputNativeBase, IInputProps, HStack } from 'native-base';




type InputProps = IInputProps & {


}
export const Input =({ ...rest}: InputProps)=>{
 
    return (
        <HStack>
            <InputNativeBase
                placeholderTextColor='gray.400'
                color='gray.600'
                height={13}
                width={69}
                borderRadius={6}
                bg='gray.50'
                borderWidth={0}
                my={3}
                fontFamily='body'
                fontSize='md'
                {...rest}
                 
                />
        </HStack>
    );
};