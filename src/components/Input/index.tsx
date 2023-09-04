import { Input as InputNativeBase, IInputProps, VStack , FormControl, View, Text} from 'native-base';


type InputProps = IInputProps & {
errorMessage: string | undefined;

}
export const Input =({ errorMessage, ...rest}: InputProps)=>{
 
    return (
        <FormControl>
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
                _focus={{
                    bg: 'gray.300',
                    borderWidth:1,
                    borderColor: 'blue.600'
                }}
                {...rest}
                 
                />


            { errorMessage !== undefined && (
                <FormControl.ErrorMessage mt='-2'>
                    <Text fontSize='xs' fontFamily='bold' color='red.400'>
                        {errorMessage}
                    </Text>
                </FormControl.ErrorMessage>

            )}
        </FormControl>
    );
};