import { useState } from "react";
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
  Text
} from "native-base";

import { TagBox } from "@components/TagBox";
import { Button } from '@components/Button';
import { PaymentsCheckBox } from '@components/PaymentsCheckBox'; 


import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

const ModalSchemed = yup.object().shape({
  accept_trade: yup.boolean().required().default(false),
  payments: yup.array().of(yup.string().required('Choose one method of payment.')).default(['credit_card']),
});

type FormData = yup.InferType<typeof ModalSchemed>; 


type ModalProps = IModalProps & {
  isOpen: boolean;
  onCloseClick: () => void;
};

export const Modal = ({ isOpen, onCloseClick, ...rest }: ModalProps) => {
  const [isNew, setIsNew] = useState(true);
  const [acceptsTrade, setIsAcceptsTrade] = useState(false);
  const [paymentMethods, setPaymentMethods ] = useState<string[]>(['Bill','Zelle', 'Credit Card']);
  const [paymentsSelected, setPaymentsSelected] = useState<string[]>(['Credit Card']); 
  
  LogBox.ignoreLogs([
    'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
  ])

  const {
    control, handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(ModalSchemed),
  });


 
  
  const toggleProductNewOrUsed = () => {
    setIsNew((prevSate) => !prevSate);
  };

  const handlePaymentsSelected = (item: any) => {  
    
    console.log(item, 'methods of payment',  isNew, 'product isNew', acceptsTrade, 'acceptsTrade')
    };
  


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
              isActive={isNew}
              setProductState={toggleProductNewOrUsed}
            />
            <TagBox
              title="used"
              isActive={!isNew}
              setProductState={toggleProductNewOrUsed}
            />
          </HStack>

          <VStack mb={6}>
            <Heading mt={6} mb={4} fontFamily="heading" fontSize="sm">
              Accept trade ?
            </Heading>

            <HStack>
              <Controller
                name='accept_trade'
                control={control}
                render={({field: { value, onChange}})=>(
                  <Switch
                    value={value}
                    onValueChange={onChange}
                    size="lg"
                    onTrackColor="blue.600"
                  />

                )}

              />
            </HStack>
          </VStack>

          <Heading mb={6} fontFamily="heading" fontSize="sm">
            Methods of payments accepted
          </Heading>

          <View>


              <Controller 
                  name='payments'
                  control={control}
                  rules={{required: true}}
                  render={({field: { value, onChange}})=>(
                    <PaymentsCheckBox
                      value={value}
                      onChange={onChange}
                    />
                    
                    
                    )}
                    />
                    { errors?.payments && 
                      <Text
                        color='red.400'
                        fontFamily='body'
                        fontSize='sm'
                      >
                        {errors.payments.message}
                      </Text> }


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
                    onPress={()=>console.log('Reset filters')}
                />
                <Button 
                    title='Apply filters'
                    size={46}
                    backColor="gray.900"
                    color='gray.50'
                    onPressColor='gray.600'
                    onPress={handleSubmit(handlePaymentsSelected)}
                />
            </HStack>
            
          </ModalNativeBase.Footer>
      </ModalNativeBase.Content>
    </ModalNativeBase>
  );
};
