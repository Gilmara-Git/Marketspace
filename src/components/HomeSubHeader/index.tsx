import { VStack, HStack, Center , Text } from 'native-base';
import { Horse } from 'phosphor-react-native';

export const HomeSubHeader = ()=>{
    console.log(typeof Horse, 'line5')
    return (
        <VStack mt={8}>
            <Text fontFamily='body' fontSize='sm'>Your Ads listed for sale</Text>

            <HStack bg='blue.100' height='66' >
                <Center>
                    <VStack>
                        <Horse />
                    </VStack>

                    <VStack>

                    </VStack>
                    <HStack>

                    </HStack>

                </Center>
            </HStack>
        </VStack>
    )
};
