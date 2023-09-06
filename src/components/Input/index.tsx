import { Input as InputNativeBase, IInputProps,FormControl} from 'native-base';

type InputProps = IInputProps & {
errorMessage?: string | undefined;
}
export const Input =({ errorMessage, isInvalid, ...rest}: InputProps)=>{
 const invalid = !!errorMessage || isInvalid;
    return (
        <FormControl
            isInvalid={invalid}
        >
            <InputNativeBase
                isInvalid={invalid}
                _invalid={{
                    borderWidth: 1,
                    borderColor: 'red.400'
                }}
                placeholderTextColor='gray.400'
                color='gray.600'
                height={13}
                width={69}
                borderRadius={6}
                bg='gray.50'
                borderWidth={0}
                my={2}
                fontFamily='body'
                fontSize='md'
                _focus={{
                    bg: 'gray.300',
                    borderWidth:1,
                    borderColor: 'blue.600'
                }}
                {...rest}
                 
                />

                <FormControl.ErrorMessage mt='-2'>
                    {errorMessage}
                </FormControl.ErrorMessage>
           
        </FormControl>
    );
};