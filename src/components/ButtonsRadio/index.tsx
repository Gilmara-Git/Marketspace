import { Radio, IRadioGroupProps, HStack, Text , FormControl, Icon} from "native-base";
import { Ionicons } from '@expo/vector-icons';

type ButtonsRadio = IRadioGroupProps & {
    errorMessage: string | undefined;

};

export const ButtonsRadio = ({ errorMessage, isInvalid, ...rest }: ButtonsRadio) => {
    const invalid = !!errorMessage || isInvalid

  return (
    <FormControl
        isInvalid={invalid}
    >

      <Radio.Group
        isInvalid={invalid}
      {...rest}>
        <HStack>
          <Radio
            bgColor="transparent"
            value="new"
            size={5}
            icon={<Icon  as={Ionicons} name='md-checkmark-sharp'color='white'/>}
            colorScheme='blue'
            >
            <Text width={20} fontFamily="body" fontSize="md">
              New
            </Text>
          </Radio>
          
          <Radio
           bgColor="transparent"
            value="used"
            size={5}
            colorScheme='blue'
            icon={<Icon  as={Ionicons} name='md-checkmark-sharp'color='white'/>}
          >
            <Text width={20} fontFamily="body" fontSize="md">
              Used
            </Text>
          </Radio>
        </HStack>
      </Radio.Group>

      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
      
    </FormControl>
 
  );
};
