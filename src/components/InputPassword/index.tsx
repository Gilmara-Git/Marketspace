import { useState } from "react";
import {
  Input as InputNativeBase,
  IInputProps,
  FormControl,
  Icon,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

type InputProps = IInputProps & {
  errorMessage?: string | undefined;
};

export const InputPassword = ({ errorMessage, isInvalid, ...rest }: InputProps) => {

  const invalid = !!errorMessage || isInvalid;
   
  const [hidePassword, setHidePassword] = useState(true);
  const togglePassword = () => {
    setHidePassword((prevState) => !prevState);
  };

  return (
    <FormControl
      isInvalid={invalid}
    >
      <InputNativeBase
       isInvalid={invalid}
       _invalid={{ borderWidth: 1, borderColor: 'red.400'}}
        height={13}
        width={69}
        borderRadius={6}
        bg="gray.50"
        borderWidth={0}
        my={3}
        fontFamily="body"
        fontSize="md"
        secureTextEntry={hidePassword}
        _focus={{
          bg: "gray.300",
          borderWidth: 1,
          borderColor: "blue.600",
        }}
        InputRightElement={
          <Icon
            as={Ionicons}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            size={5}
            mr={4}
            onPress={togglePassword}
          />
        }
        {...rest}
      />

        <FormControl.ErrorMessage mt='-2'>
            {errorMessage}
        </FormControl.ErrorMessage>
    
    </FormControl>
  );
};
