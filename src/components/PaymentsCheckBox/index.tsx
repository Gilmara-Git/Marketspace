import { LogBox } from 'react-native';
import { Checkbox, ICheckboxGroupProps,   } from 'native-base';

export const PaymentsCheckBox = ({value, ...rest}: ICheckboxGroupProps)=>{
  

    LogBox.ignoreLogs([
        'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
        'A component changed from uncontrolled to controlled'
    ]);

    return (
    
            <Checkbox.Group
            defaultValue={value}
                {...rest}
                >
                <Checkbox
                    value='pix'
                    mb={2}
                    colorScheme='blue'
                 
                    
                    >
                Zelle
                </Checkbox>

                <Checkbox
                    value='card'
                    mb={2}
                    colorScheme='blue'
                  
                    >
                    Credit Card
                </Checkbox>

                <Checkbox
                    value='deposit'
                    mb={2}
                    colorScheme='blue'
                 
                    >
                     Deposit   
                </Checkbox>

                <Checkbox
                    value='cash'
                    mb={2}
                    colorScheme='blue'
            
                    >
                    Cash
                </Checkbox>



                <Checkbox
                    value='boleto'
                    mb={2}
                    colorScheme='blue'
        
                    >
                    Bill
                </Checkbox>


            </Checkbox.Group>

)
        
};

