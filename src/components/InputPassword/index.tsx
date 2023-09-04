import { useState } from "react";
import {
  Input as InputNativeBase,
  IInputProps,
  FormControl,
  Icon,
  View,
  Text,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

type InputProps = IInputProps & {
  errorMessage?: string | undefined;
};

export const InputPassword = ({ errorMessage, ...rest }: InputProps) => {
   
  const [hidePassword, setHidePassword] = useState(true);
  const togglePassword = () => {
    setHidePassword((prevState) => !prevState);
  };

  return (
    <FormControl>
      <InputNativeBase
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

      {errorMessage !== undefined && (
        <FormControl.ErrorMessage mt='-2'>
          <Text fontSize='xs' fontFamily='bold' color='red.400'>{errorMessage}</Text>
        </FormControl.ErrorMessage>
      )}
    </FormControl>
  );
};
