import { LogBox } from 'react-native';
import { Checkbox, ICheckboxGroupProps,   } from 'native-base';



export const PaymentsCheckBox = ({ value,...rest}: ICheckboxGroupProps)=>{
console.log(value)
    LogBox.ignoreLogs([
        'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
        'A component changed from uncontrolled to controlled'
    ]);

    return (
    
            <Checkbox.Group
                colorScheme='blue'
                defaultValue={['credit_card']}
                {...rest}
             
                >
                <Checkbox
                    value='bill'
                    mb={2}
                    
                    >
                    Bill
                </Checkbox>

                <Checkbox
                    value='zelle'
                    mb={2}
                    >
                Zelle - 908 976 5433
                </Checkbox>

                <Checkbox
                    value='credit_card'
                    mb={2}
                    isHovered
                    isFocused
                    isPressed
                    isChecked
                    >
                    Credit Card
                </Checkbox>

            </Checkbox.Group>

)
        
};

