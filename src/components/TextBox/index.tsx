import { TextArea, ITextAreaProps, FormControl } from "native-base";

type TextBoxProps = ITextAreaProps & {
    errorMessage?: string | undefined;
}

export const TextBox = ({ errorMessage, isInvalid, ...rest }: TextBoxProps)=>{
    const invalid = !!errorMessage || isInvalid;
   
    return (
        <FormControl
        mt={2}
        pb={20}
            isInvalid={invalid}
           
        >
            <TextArea 
                autoCompleteType='auto'
                numberOfLines={5}
                placeholder='Describe your product'
                placeholderTextColor='gray.400'
                color='gray.600'
                minHeight={17}
                isInvalid={invalid}
                _invalid={{ borderWidth: 1, borderColor: 'red.400'}}
                borderRadius={6}
                bgColor='gray.50'
                fontFamily="body"
                fontSize="md"
                borderWidth={0}
                _focus={{
                    bg: "gray.300",
                borderWidth: 1,
                borderColor: "blue.600",
            }}
                {...rest}
                />

                <FormControl.ErrorMessage>
                    {errorMessage}
                </FormControl.ErrorMessage>
        </FormControl>
    )
};