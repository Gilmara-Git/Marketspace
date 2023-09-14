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
  
} from "native-base";

import { TagBox } from "@components/TagBox";
import { Button } from '@components/Button';
import SelectMultiple from 'react-native-select-multiple';


type ModalProps = IModalProps & {
  isOpen: boolean;
  onCloseClick: () => void;
};

export const Modal = ({ isOpen, onCloseClick, ...rest }: ModalProps) => {
  const [isNew, setIsNew] = useState(true);
  const [acceptsTrade, setIsAcceptsTrade] = useState(false);
  const [paymentMethods, setPaymentMethods ] = useState<string[]>(['Bill','Zelle', 'Cash', 'Credit card','Deposit']);
  const [paymentsSelected, setPaymentsSelected] = useState<string[]>([]); 
  
  LogBox.ignoreLogs([
    'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
  ])
  
  const toggleProductNewOrUsed = () => {
    setIsNew((prevSate) => !prevSate);
  };

  const handlePaymentsSelected = (selections: any, item: any) => {
   
    if(!paymentsSelected.includes(item.value)){
        setPaymentsSelected((prev)=>[item.value, ...prev])
    }else{
            let current = paymentsSelected;
            // it did not take filter, I had to find the index and apply splice
            const index = current.indexOf(item.label);
            current.splice(index, 1);  
            setPaymentsSelected([...current])
    }
        
    };
  
    console.log(paymentsSelected)

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
              <Switch
                value={acceptsTrade}
                onValueChange={setIsAcceptsTrade}
                size="lg"
                onTrackColor="blue.600"
              />
            </HStack>
          </VStack>

          <Heading mb={6} fontFamily="heading" fontSize="sm">
            Methods of payments accepted
          </Heading>

          <View>

            <SelectMultiple
                style={{ showsVerticalScrollIndicator: 'false'}}
                checkboxStyle={{backgroundColor: '#d2daf5' , width:18, height: 18}}
                labelStyle={{ color: '#3E3A40',  padding: 5}}
                items={paymentMethods}
                selectedItems={paymentsSelected}
                onSelectionsChange={handlePaymentsSelected}
                
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
                    onPress={()=>console.log('Reset filters')}
                />
                <Button 
                    title='Apply filters'
                    size={46}
                    backColor="gray.900"
                    color='gray.50'
                    onPressColor='gray.600'
                    onPress={()=>console.log('Apply filters')}
                />
            </HStack>
            
          </ModalNativeBase.Footer>
      </ModalNativeBase.Content>
    </ModalNativeBase>
  );
};
