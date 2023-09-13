import { HStack, Text } from "native-base";
import { UserPhoto } from "@components/UserPhoto";

export const UserDisplay = () => {
  return (
    <HStack>
      <UserPhoto mb={5} borderColor="blue.600" size={6} />
      <Text ml={2} fontFamily="body" fontSize="sm">
        Gilmara Pimentel
      </Text>
    </HStack>
  );
};
