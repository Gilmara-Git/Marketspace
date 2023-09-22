import { VStack, HStack, Center, Heading, Text, IconButton } from "native-base";
import { Tag } from "phosphor-react-native";
import { Feather } from '@expo/vector-icons';



type HomeSubHeaderProps = {
  uponClicking: ()=>void; 
}

export const HomeSubHeader = ({ uponClicking }: HomeSubHeaderProps) => {
  return (
    <VStack mt={8}>
      <Text fontFamily="body" fontSize="sm" color='gray.600' mb={3}>
        Your Ads listed for sale
      </Text>

      <HStack bg="blue.100" height={16} width={75}>
        <Center px={4}>
          <HStack>
            <VStack pt={2}>
              <Tag color="#364D9D" weight="regular" size="22" />
            </VStack>

            <VStack ml={4} pr={24}>
              <Heading fontFamily="heading" fontSize="xl" color='gray.800'>
                4
              </Heading>
              <Text fontFamily="body" fontSize="xs" color='gray.800'>
                Active Adds
              </Text>
            </VStack>

            <HStack>
              <Center>
                <HStack>
                  <Heading
                    pl={4}
                    pr={2}
                    fontFamily="heading"
                    fontSize="xs"
                    color="blue.900"
                  >
                    My Adds
                  </Heading>
                  <IconButton
                    onPress={uponClicking}
                    _pressed={{ opacity: .5}}
                    size={4} 

                    _icon={{
                      as: Feather,
                      color:'blue.900',
                      name:'arrow-right',
                      
                    }}
                  />
                 
                </HStack>
              </Center>
            </HStack>
          </HStack>
        </Center>
      </HStack>
    </VStack>
  );
};
