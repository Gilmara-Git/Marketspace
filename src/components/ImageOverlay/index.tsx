import { View } from "native-base";

type ImageOverlay = {
    rounded?: number;
   
}

export const ImageOverlay = ({  rounded }: ImageOverlay) => {
  return (
    <View
        bg="rgba(0,0,0, 0.5)"
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        rounded={rounded}
    />
  );
};
