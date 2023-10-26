import { useState, useCallback } from "react";
import { ScrollView, Linking } from "react-native";
import {
  VStack,
  HStack,
  View,
  Heading,
  Text,
  Box,
  Icon,
  Divider,
  Center,
  useToast,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

import { UserDisplay } from "@components/UserDisplay";
import { PaymentMethods } from "@components/PaymentMethods";
import { Button } from "@components/Button";

import { NavigationHeader } from "@src/components/NavigationHeader";
import { ImageSlider } from "@components/ImageSlider";
import { ArrowLeft } from "phosphor-react-native";

import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { AppRoutesNavigationTabProps } from "@routes/app.routes";
import { AllProductsDTO } from "@src/dtos/AllProductsDTO";

import { AppError } from "@utils/AppError";
import { api } from "@services/api";

interface AdDetailsParams {
  productId: string;
}


export const AdDetails = () => {
  const [productDetails, setProductDetails] = useState<AllProductsDTO>(
    {} as AllProductsDTO
  );
  const [isFetchingProduct, setIsFetchingProduct] = useState(false);
  const navigation = useNavigation<AppRoutesNavigationTabProps>();
  const route = useRoute();
  const toast = useToast();

  const { productId } = route.params as AdDetailsParams;

  const fetchProduct = async () => {
    try {
      setIsFetchingProduct(true);
      const { data } = await api.get(`/products/${productId}`);
      data.payment_methods.forEach((item:{key: string, name: string})=>{
        if(item.key === 'pix'){
            item.key = 'zelle'
          
        }
        if(item.key === 'boleto'){
            item.key = 'bill'
        }
    
    })

      setProductDetails({
        ...data,
          price: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(data.price / 100),
        tel: Number(data.user.tel),
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      toast.show({
        title: isAppError
          ? error.message
          : "There was an error fetching product.",
        placement: "top",
        bg: "red.400",
        duration: 3000,
      });
    } finally {
      setIsFetchingProduct(false);
    }
  };

  const whatsAppUrl = `https://wa.me/${productDetails?.user?.tel}`;

  const handleWhatAppButtonPress = useCallback(
    async (url: string) => {
      const supportedURL = await Linking.canOpenURL(whatsAppUrl);

      if (supportedURL) {
        await Linking.openURL(url);
      } else {
        toast.show({
          title: "There was an error: Unable to direct your to WhatsApp",
          placement: "top",
          bg: "red.400",
          duration: 3000,
        });
      }
    },
    [whatsAppUrl]
  );

  const handleBackHome = () => {
    navigation.goBack();
  };

  useFocusEffect(
    useCallback(() => {
      fetchProduct();
    }, [productId])
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <NavigationHeader
        iconLeft={ArrowLeft}
        leftIconClick={handleBackHome}
        bgColor="gray.50"
      />

      <VStack bg="gray.50">
        <View>
          <ImageSlider productImages={productDetails.product_images} />
        </View>

        <VStack px={6} mt={6}>
          <UserDisplay
            userName={productDetails?.user?.name}
            userAvatar={productDetails?.user?.avatar}
          />

          <VStack>
            <HStack pb={2}>
              <Box bg="gray.300" rounded="full" px={1.5} py={1}>
                <Text
                  px={1}
                  fontFamily="heading"
                  fontSize="2xs"
                  color="gray.800"
                  textTransform="uppercase"
                >
                  {productDetails?.is_new ? "New" : "Used"}
                </Text>
              </Box>
            </HStack>

            <HStack pb={1.5} justifyContent="space-between">
              <View width={64}>
              <Heading fontFamily="heading" fontSize="xl">
                {productDetails?.name}
              </Heading>

              </View>
              <Text fontFamily="heading" fontSize="xl" color="blue.600">
                <Text fontSize="sm">{productDetails.price}</Text>
              </Text>
            </HStack>

            <Text numberOfLines={4} fontFamily="body" fontSize="sm">
              {productDetails?.description}
            </Text>

            <Heading mt={6} mb={5} fontFamily="heading" fontSize="sm">
              Accept Trade ?{" "}
              <Text fontFamily="body" fontSize="sm">
                {productDetails?.accept_trade ? "Yes" : "No"}
              </Text>
            </Heading>

            <Heading mb={2} fontFamily="heading" fontSize="sm">
              Methods of Payments:
            </Heading>

            {productDetails?.payment_methods?.map((method) => {
              return <PaymentMethods key={method.key} method={method} />;
            })}
          </VStack>
        </VStack>
      </VStack>

      <VStack px={6} py={6} bg="white" width="full" maxHeight={28}>
        <HStack justifyContent="space-between">
          <Heading color="blue.900" fontFamily="body">
            {productDetails.price}
          </Heading>
          <Button
            color="gray.50"
            title="Contact us"
            backColor="blue.600"
            leftIcon={
              <Icon as={Ionicons} name="logo-whatsapp" size={4} color="white" />
            }
            onPressColor="blue.900"
            size={48}
            onPress={handleWhatAppButtonPress.bind(null, whatsAppUrl)}
          />
        </HStack>

        <Center pb={2} mt={4} flexShrink={0}>
          <Divider width={40} p={0.5} rounded="full" />
        </Center>
      </VStack>
    </ScrollView>
  );
};
