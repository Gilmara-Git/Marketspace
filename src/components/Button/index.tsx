
import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';


type ButtonProps = IButtonProps & {
    title: string,
    size: number,
    leftIcon?: any,
    rightIcon?: any,
    backColor: string,
    color: string,
    onPressColor: string
} 

export const Button =({title, leftIcon, backColor, color, size, onPressColor, ...rest}: ButtonProps)=>{

    return (
        <ButtonNativeBase 
            height={11}
            width={size} 
            bg={backColor}
            _pressed={{bg: onPressColor}}
            leftIcon={leftIcon}
            {...rest}
            >
                 
            <Text
                ml={leftIcon ? '1': ''} 
                fontFamily='heading' 
                color={color}>{title}
            </Text>
        </ButtonNativeBase>
    )
};