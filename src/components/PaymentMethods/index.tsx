import { HStack, Icon, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const iconsType : { [ key: string ]: string} = {
    'Zelle': 'qr-code-outline',
    'Credit Card': 'card',  
    'Deposit': 'ios-wallet-outline',
    'Cash': 'ios-wallet',
    'Bill': 'barcode-outline',
}

type PaymentMethodsProps = {
    method: any;
    
}


export const PaymentMethods = ({ method  }: PaymentMethodsProps)=>{
   
    return (
        <HStack>
        <Icon 
            as={Ionicons} 
            name={iconsType[method]} 
            size={5}
            />
            <Text 
                ml={3}
                mb={2}
                fontFamily='body'
                fontSize='sm'
                >
                    {method}
            </Text>

    </HStack>
    )
};