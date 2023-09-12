import { HStack, Icon, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const iconsType : { [ key: string ]: string} = {
    Bill: 'barcode-outline',
    Zelle: 'qr-code-outline',
    Cash: 'cash-outline',
    Deposit: 'wallet-outline',
}

type PaymentMethodsProps = {
    method: string;
    
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