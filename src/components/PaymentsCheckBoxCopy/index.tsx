import { useEffect } from 'react';
import { LogBox } from 'react-native';
import { Checkbox, ICheckboxGroupProps,   } from 'native-base';

type PaymentCheckboxProps = ICheckboxGroupProps & {
    methodOptions: string[];
    isInvalid?: boolean;
    errorMessage?: string;
    selectionOption: (value: string)=>void;
}

export const PaymentsCheckBoxCopy = ({ methodOptions, ...rest}: PaymentCheckboxProps)=>{
    console.log(methodOptions, 'paymentOptions coming on PaymentChecBox')
  

useEffect(()=>{
    LogBox.ignoreLogs([
            'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
            'A component changed from uncontrolled to controlled'
        ]);

},[])

    return (
    
            <Checkbox.Group
                colorScheme='blue'>
                { methodOptions.forEach(item=>
                    <Checkbox key={item} value={item}>{item}</Checkbox>
                )}
           

                
    
            </Checkbox.Group>

)
        
};

