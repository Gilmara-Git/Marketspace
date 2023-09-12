import { View } from "native-base";

type ImageOverlay = {
    rounded?: number;
    width: number
}

export const ImageOverlay = ({ width, rounded }: ImageOverlay) => {
  return (
    <View
        bg="rgba(0,0,0, 0.5)"
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        width={width}
        rounded={rounded}
    />
  );
};
