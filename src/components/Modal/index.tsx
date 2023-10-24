import { useEffect, useState} from "react";
import { LogBox } from 'react-native';
import {
  Modal as ModalNativeBase,
  IModalProps,
  Heading,
  Divider,
  HStack,
  VStack,
  Switch,
  View,
  Center,
  Text
} from "native-base";

import { TagBox } from "@components/TagBox";
import { Button } from '@components/Button';
import CheckBox from '@react-native-community/checkbox';



type ModalProps = IModalProps & {
  isOpen: boolean;
  onCloseClick: () => void;
  onOpenClick: () => void;
  onIsNewChanged: ( value: boolean | undefined )=>void;
  isNewFilter: boolean | undefined;
  onAcceptTradeChange: ( value: boolean | undefined )=>void;
  acceptTrade: boolean | undefined;
  onPaymentMethodsChanged: (value: string[]) =>void;
  paymentMethods: string[] | undefined;
 
};

export const Modal = ({ 
  isOpen, 
  onCloseClick, 
  onOpenClick, 
  onIsNewChanged,
  isNewFilter, 
  onAcceptTradeChange,
  acceptTrade, 
  onPaymentMethodsChanged,
  paymentMethods,
  ...rest }: ModalProps) => {


    const initialState = {
      pix: false,
      deposit: false,
      cash: false,
      card: false,
      boleto: false,
    };
    const [paymentState, setPaymentState] = useState(initialState);


    const resetFilters = ()=>{
      onIsNewChanged(undefined);
      onAcceptTradeChange(undefined);
      onPaymentMethodsChanged([]);
  

    }
    
    const getPaymentsToFilter = ()=>{
      let payments = [];
      for(let key in paymentState){
        if(paymentState[key as keyof typeof paymentState] === true){
          payments.push(key);
        }
      }
   
      onPaymentMethodsChanged(payments)
    };


    useEffect(()=>{
      LogBox.ignoreLogs([
        'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
      ])
    }, []);

    useEffect(()=>{
      getPaymentsToFilter();
    }, [paymentState])


  return (
    <ModalNativeBase
      justifyContent="flex-end"
      avoidKeyboard
      animationPreset="slide"
      size="xl"
      isOpen={isOpen}
      onClose={() => onCloseClick()}
      {...rest}
    >
      <ModalNativeBase.Content width="full" bg="gray.200" rounded="3xl">
        <Divider
          thickness={3}
          orientation="horizontal"
          w={14}
          my={3}
          m="auto"
        />
        <ModalNativeBase.Header bg="gray.200" borderBottomWidth={0}>
          <ModalNativeBase.CloseButton />
          <Heading fontFamily="heading" fontSize="xl">
            Filter Ads
          </Heading>
        </ModalNativeBase.Header>

        <ModalNativeBase.Body bg="gray.200">
          <Heading mb={3} fontFamily="heading" fontSize="sm">
            Condition
          </Heading>

          <HStack>
            <TagBox
              title="new"
              isActive={isNewFilter}
              setProductState={()=>onIsNewChanged(true)}
            />
            <TagBox
              title="used"
              isActive={!isNewFilter}
              setProductState={()=>onIsNewChanged(false)}
            />
          </HStack>

          <VStack mb={6}>
            <Heading mt={6} mb={4} fontFamily="heading" fontSize="sm">
              Accept trade ?
            </Heading>

            <HStack>
             
              <Switch 
                defaultIsChecked={false}
                value={acceptTrade}
                onValueChange={()=>onAcceptTradeChange(!acceptTrade) }
                size='lg'
                onTrackColor='blue.600'
                />
            </HStack>
          </VStack>

          <Heading mb={6} fontFamily="heading" fontSize="sm">
            Methods of payments accepted
          </Heading>

          <View>
          <HStack mb={2}>
                    <CheckBox
                        disabled={false}
                        value={paymentState.pix}
                        onValueChange={(value: any) => setPaymentState({...paymentState, pix:value})}
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
                        value={paymentState.deposit}
                        onValueChange={(value: any) => setPaymentState({...paymentState, deposit:value})}
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
                        value={paymentState.cash}
                        onValueChange={(value: any) => setPaymentState({...paymentState, cash:value})}
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
                        value={paymentState.card}
                        onValueChange={(value: any) => setPaymentState({...paymentState, card:value})}
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
                          value={paymentState.boleto}
                          onValueChange={(value: any) => setPaymentState({...paymentState, boleto:value})}
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
            
        </ModalNativeBase.Body>
        <ModalNativeBase.Footer borderTopWidth={0} bg='gray.200' textDecoration={false}>
            
            <HStack justifyContent='space-around' flex={1}>
                <Button 
                    title='Reset filters'
                    size={46}
                    backColor='gray.300'
                    color='gray.800'
                    onPressColor='gray.400'
                    onPress={resetFilters}
                />
                <Button 
                    title='Apply filters'
                    size={46}
                    backColor="gray.900"
                    color='gray.50'
                    onPressColor='gray.600'
                    onPress={onCloseClick}
                />
            </HStack>
            
          </ModalNativeBase.Footer>
      </ModalNativeBase.Content>
    </ModalNativeBase>
  );
};
