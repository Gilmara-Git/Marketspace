import { HStack, Divider } from "native-base";

export const LineDivider = () => {
  return (
    <HStack
      justifyContent="space-around"
      position="absolute"
      bottom={1}
      left={0.5}
      width="100%"
      px={1}
    >
      <Divider width={118} p={0.5} rounded={8} bg="gray.50" />
      <Divider width={118} p={0.5} rounded={8} bg="transparent" />
      <Divider width={118} p={0.5} rounded={8} bg="transparent" />
    </HStack>
  );
};
