import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';
import SvgImage from 'react-native-svg/lib/typescript/elements/Image';

type ButtonProps = IButtonProps & {
    title: string,
    size: number,
    icon?: SvgImage,
    backColor: string,
    color: string,
} 

export const Button =({title, icon, backColor, color, size, ...rest}: ButtonProps)=>{
   
    return (
        <ButtonNativeBase 
            height={10}
            width={size} 
            bg={backColor}
            {...rest}
            >
        
            <Text fontFamily='heading' color={color}>{title}</Text>
        </ButtonNativeBase>
    )
};