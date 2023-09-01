import { Input as InputNativeBase, IInputProps, HStack, Text} from 'native-base';
import { Svg } from 'react-native-svg';



type InputProps = IInputProps & {
name: string;
icon?: Svg;
}
export const Input =({name, icon, ...rest}: InputProps)=>{
    console.log(icon, 'lin11');
    return (
        <HStack>
            <InputNativeBase
                placeholder={name}
                height='45'
                width='279'
                borderRadius={6}
                bg='gray.50'
                borderWidth='0'
                my={3}
                fontFamily='body'
                fontSize='md'
                {...rest}
               
                />
        </HStack>
    );
};