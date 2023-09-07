import { VStack, HStack, Center, Heading, Text } from "native-base";
import { Tag, ArrowRight } from "phosphor-react-native";

export const HomeSubHeader = () => {
  return (
    <VStack mt={8}>
      <Text fontFamily="body" fontSize="sm">
        Your Ads listed for sale
      </Text>

      <HStack bg="blue.100" height="66" width="327">
        <Center px={4}>
          <HStack>
            <VStack pt={2}>
              <Tag color="#364D9D" weight="regular" size="22" />
            </VStack>

            <VStack ml={4} pr={24}>
              <Heading fontFamily="heading" fontSize="xl">
                4
              </Heading>
              <Text fontFamily="body" fontSize="xs">
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
                  <ArrowRight color="#364D9D" weight="regular" size="16" />
                </HStack>
              </Center>
            </HStack>
          </HStack>
        </Center>
      </HStack>
    </VStack>
  );
};
