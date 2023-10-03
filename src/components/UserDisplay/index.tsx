import { HStack, Text } from "native-base";
import { UserPhoto } from "@components/UserPhoto";

type UserDisplay = {
  userName: string;
}

export const UserDisplay = ({ userName}: UserDisplay) => {
  return (
    <HStack>
      <UserPhoto mb={5} borderColor="blue.600" size={6} />
      <Text ml={2} fontFamily="body" fontSize="sm">
        {userName}
      </Text>
    </HStack>
  );
};
