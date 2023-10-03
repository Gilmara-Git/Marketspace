import { HStack, Box, Icon, Heading, Pressable, IPressableProps} from "native-base";

type NavigationHeaderProps = IPressableProps & {
  iconLeft?: any;
  title?: string;
  iconRight?: any;
  bgColor: string;
  leftIconClick?: () => void;
  rightIconClick?: () => void;
};

export const NavigationHeader = ({
  iconLeft,
  iconRight,
  title,
  leftIconClick,
  rightIconClick,
  bgColor,
  ...rest
 
}: NavigationHeaderProps) => {


  return (
    <HStack justifyContent="space-between"
       width="100%"
       pt={9}
       pb={2}
       px={6}
       bg={bgColor}
      >
        {iconLeft && (
          <Pressable
            onPress={leftIconClick}
            {...rest}
          >

            <Box>
              <Icon as={iconLeft} color='gray.900'/>
            </Box>
          </Pressable>
        )}

        <Box flex={iconLeft || iconRight ? 1 : 0}>
          <Heading 
              textAlign="center"
              fontFamily='heading' 
              fontSize='xl' 
              >
                {title}
          </Heading>
        </Box>

        {iconRight && (
            <Pressable
              onPress={rightIconClick}
              {...rest}
             
            >
          <Box >
            <Icon 
              as={iconRight}
              />
          </Box>
        </Pressable>
        )}
      </HStack>
  );
};
