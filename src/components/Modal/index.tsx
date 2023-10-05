import { useState , useEffect } from "react";
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
} from "native-base";

import { TagBox } from "@components/TagBox";
import { Button } from '@components/Button';
import { PaymentsCheckBox } from '@components/PaymentsCheckBox'; 


import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

// const ModalSchemed = yup.object().shape({
//   accept_trade: yup.boolean().required().default(false),
//   payment_methods: yup.array().of(yup.string().required('Choose one method of payment.')).default(['credit_card']),
// });

// type FormData = yup.InferType<typeof ModalSchemed>; 


type ModalProps = IModalProps & {
  isOpen: boolean;
  onCloseClick: () => void;
  onOpenClick: () => void;
  retrieveFilters: (is_new: boolean, accept_trade: boolean, payment_methods: any[])=>void;

};

export const Modal = ({ isOpen, onCloseClick, retrieveFilters, onOpenClick,  ...rest }: ModalProps) => {
  const [is_new, setIs_new] = useState(true);
  const [accept_trade, setAccept_trade] = useState<boolean>(false);
  const [payment_methods, setPayment_methods ] = useState<any[]>();

  
  const updateTradeOption = ()=>{
    setAccept_trade((prevState) => !prevState );
  }
  console.log(is_new, accept_trade, payment_methods, 'linha43')
  // const {
  //   reset,
  //   control, 
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FormData>({
  //   resolver: yupResolver(ModalSchemed),
  // });


 
  
  const toggleProductNewOrUsed = () => {
    setIs_new((prevSate) => !prevSate);
  };

  const updatePaymentMethods = (value:any)=>{
    setPayment_methods(value)
  };

const resetFiltersToDefault = () => {
  setAccept_trade(false);
  is_new === false && setIs_new(true);

  // setPayment_methods(['card']);
};

  const handlePaymentsSelected = () => {  
    retrieveFilters(is_new, accept_trade , payment_methods);
    onCloseClick();
    // console.log(item, 'methods of payment',  is_new, 'product isNew')
    };
  

    useEffect(()=>{
      resetFiltersToDefault()
    },[accept_trade])

    useEffect(()=>{
      LogBox.ignoreLogs([
        'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
      ])
    }, []);


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
              isActive={is_new}
              setProductState={toggleProductNewOrUsed}
            />
            <TagBox
              title="used"
              isActive={!is_new}
              setProductState={toggleProductNewOrUsed}
            />
          </HStack>

          <VStack mb={6}>
            <Heading mt={6} mb={4} fontFamily="heading" fontSize="sm">
              Accept trade ?
            </Heading>

            <HStack>
              {/* <Controller
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

              /> */}
              <Switch 
                defaultIsChecked={accept_trade}
                value={accept_trade}
                onValueChange={updateTradeOption}
                size='lg'
                onTrackColor='blue.600'
                />
            </HStack>
          </VStack>

          <Heading mb={6} fontFamily="heading" fontSize="sm">
            Methods of payments accepted
          </Heading>

          <View>


              {/* <Controller 
                  name='payment_methods'
                  control={control}
                  rules={{required: true}}
                  render={({field: { value, onChange}})=>(
                    <PaymentsCheckBox
                      value={value}
                      onChange={onChange}
                    />
                    
                    
                    )}
                    />
                    { errors?.payment_methods && 
                      <Text
                        color='red.400'
                        fontFamily='body'
                        fontSize='sm'
                      >
                        {errors.payment_methods.message}
                      </Text> } */}
                    <PaymentsCheckBox
                      defaultValue={payment_methods}
                      value={payment_methods}
                      onChange={updatePaymentMethods}
                    />

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
                    onPress={resetFiltersToDefault}
                />
                <Button 
                    title='Apply filters'
                    size={46}
                    backColor="gray.900"
                    color='gray.50'
                    onPressColor='gray.600'
                    onPress={handlePaymentsSelected}
                />
            </HStack>
            
          </ModalNativeBase.Footer>
      </ModalNativeBase.Content>
    </ModalNativeBase>
  );
};
