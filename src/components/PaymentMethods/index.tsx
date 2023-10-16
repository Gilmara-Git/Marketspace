import { HStack, Icon, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const iconsType : { [ key: string ]: string} = {
    'Zelle': 'qr-code-outline',
    'card': 'card',  
    'deposit': 'ios-wallet-outline',
    'cash': 'ios-wallet',
    'bill': 'barcode-outline',
}

type PaymentMethodsProps = {
    method: any;
    
}


export const PaymentMethods = ({ method  }: PaymentMethodsProps)=>{
    for(let key in method){
      
        if(method[key] === 'Dinheiro'){
            method[key] = 'Cash'
        }
        if(method[key] === 'Depósito Bancário'){
            method[key] = 'Deposit'
        }
  
        if(method[key] === 'Pix'){
            method[key] = 'Zelle'
        }
  
        if(method[key] === 'Cartão de Crédito'){
            method[key] = 'Credit Card'
        }
  
    }


    return (
        <HStack>
        <Icon 
            as={Ionicons} 
            name={iconsType[method.key]} 
            size={5}
            />
            <Text 
                ml={3}
                mb={2}
                fontFamily='body'
                fontSize='sm'
                >
                    
                {method.name}
                    
                    
            </Text>

    </HStack>
    )
};