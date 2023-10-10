import { HStack, Text } from "native-base";
import { UserPhoto } from "@components/UserPhoto";

type UserDisplay = {
  userName: string;
  userAvatar: string
}

export const UserDisplay = ({ userName, userAvatar}: UserDisplay) => {
  return (
    <HStack>
      <UserPhoto mb={5} borderColor="blue.600" size={6} userAvatar={userAvatar} />
      <Text ml={2} fontFamily="body" fontSize="sm">
        {userName}
      </Text>
    </HStack>
  );
};
