import {View, Center, HStack , Text } from 'native-base';
import CheckBox from '@react-native-community/checkbox';

type PaymentCheckboxProps = {
    paymentOptions: { pix: boolean, deposit: boolean, cash: boolean, card: boolean, boleto: boolean }
    getPaymentState: ({}) => void;

}

export const PaymentCheckbox = ( {paymentOptions, getPaymentState}: PaymentCheckboxProps)=>{
    
    return (
        <View>
            <HStack mb={2}>
                    <CheckBox
                        disabled={false}
                        value={paymentOptions.pix}
                        onValueChange={(value: boolean) => getPaymentState({...paymentOptions, pix:value})}
                        boxType='square'
                        onCheckColor="#647AC7"
                        onFillColor="#647AC7"
                        tintColor="#647AC7"
                        />

                  <Center>
                    <Text ml={2}>ZELLE</Text>
                </Center>
              </HStack>

              <HStack mb={2}>
                    <CheckBox
                        disabled={false}
                        value={paymentOptions.deposit}
                        onValueChange={(value: any) => getPaymentState({...paymentOptions, deposit:value})}
                        boxType='square'
                        onCheckColor="#647AC7"
                        onFillColor="#647AC7"
                        onTintColor="#647AC7"
                        tintColor="#647AC7"
                        />

                  <Center>
                    <Text ml={2}>DEPOSIT</Text>
                </Center>
              </HStack>

              <HStack mb={2}>
                    <CheckBox
                        disabled={false}
                        value={paymentOptions.cash}
                        onValueChange={(value: any) => getPaymentState({...paymentOptions, cash:value})}
                        boxType='square'
                        onCheckColor="#647AC7"
                        onFillColor="#647AC7"
                        onTintColor="#647AC7"
                        tintColor="#647AC7"
                        />

                  <Center>
                    <Text ml={2}>CASH</Text>
                </Center>
              </HStack>

              <HStack mb={2}>
                    <CheckBox
                        disabled={false}
                        value={paymentOptions.card}
                        onValueChange={(value: any) => getPaymentState({...paymentOptions, card:value})}
                        boxType='square'
                        onCheckColor="#647AC7"
                        onFillColor="#647AC7"
                        onTintColor="#647AC7"
                        tintColor="#647AC7"
                        />

                  <Center>
                    <Text ml={2}>CREDIT CARD</Text>
                </Center>
              </HStack>

              <HStack mb={2}>
                    <CheckBox
                        disabled={false}
                        value={paymentOptions.boleto}
                        onValueChange={(value: any) => getPaymentState({...paymentOptions, boleto:value})}
                        boxType='square'
                        onCheckColor="#647AC7"
                        onFillColor="#647AC7"
                        onTintColor="#647AC7"
                        tintColor="#647AC7"
                        />

                  <Center>
                    <Text ml={2}>BILL</Text>
                </Center>
              </HStack>
        </View>
    )
};