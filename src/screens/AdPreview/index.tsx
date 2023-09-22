import { ScrollView, Platform } from "react-native";
import {
  VStack,
  HStack,
  View,
  Image,
  Heading,
  Text,
  Box,
  Icon,
  Divider,
  Center,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import chandelier from "@assets/chandelier.png";

import { UserDisplay } from "@components/UserDisplay";
import { PaymentMethods } from "@components/PaymentMethods";
import { Button } from "@components/Button";
import { LineDivider } from "@src/components/LineDivider";

import { useNavigation, useRoute } from "@react-navigation/native";
import { AppRoutesNavigationTabProps } from "@routes/app.routes";
import { ProductDTO } from "@src/dtos/ProductDTO";

export const AdPreview = () => {
  // fake isNew, this will come from products in the AdDetails params

  const isNew = false;
  const acceptTrade = true;
  const { params } = useRoute();
  const {
    accept_trade,
    description,
    is_product_new,
    payments,
    price,
    title,
    images,
  } = params as ProductDTO;

  console.log(params, "params");

  const navigation = useNavigation<AppRoutesNavigationTabProps>();

  const handleBackEdit = () => {
    navigation.navigate("AdEdit");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack bg="blue.600" pt={10} pb={4}>
        <Center pt={4}>
          <Heading fontFamily="heading" fontSize="md" color="gray.50">
            Ad Preview
          </Heading>
          <Text fontFamily="body" fontSize="sm" color="gray.50">
            That is how your Ad will appear
          </Text>
        </Center>
      </VStack>
      <VStack bg="gray.50">
        <View>
          <Image
            width="100%"
            source={chandelier}
            defaultSource={chandelier}
            height="280"
            resizeMode="cover"
            alt="Product photo"
          />
          <LineDivider />
        </View>

        <VStack px={6} mt={6}>
          <UserDisplay />

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
                  {isNew ? "New" : "Used"}
                </Text>
              </Box>
            </HStack>

            <HStack pb={1.5} justifyContent="space-between">
              <Heading fontFamily="heading" fontSize="xl">
                Chandelier
              </Heading>
              <Text fontFamily="heading" fontSize="xl" color="blue.600">
                <Text fontSize="sm">u$</Text> 400.00
              </Text>
            </HStack>

            <Text numberOfLines={4} fontFamily="body" fontSize="sm">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum
              dicta voluptatibus deleniti. Laudantium est voluptate quae odio
              quaerat beatae a ad assumenda ducimus minima numquam,
              consequuntur, iusto quibusdam! Laborum, vero!
            </Text>

            <Heading mt={6} mb={5} fontFamily="heading" fontSize="sm">
              Accept Trade ?{" "}
              <Text fontFamily="body" fontSize="sm">
                {acceptTrade ? "Yes" : "No"}
              </Text>
            </Heading>

            <Heading mb={2} fontFamily="heading" fontSize="sm">
              Methods of Payments:
            </Heading>

            {payments.map((method) => {
              const methodsFormat: { [key: string]: string } = {
                credit_card: "Credit Card",
                zelle: "Zelle",
                bill: "Bill",
              };

              return (
                <PaymentMethods key={method} method={methodsFormat[method]} />
              );
            })}
          </VStack>
        </VStack>
      </VStack>
      <VStack
        px={Platform.OS === "ios" ? 3 : 5}
        py={6}
        bg="white"
        width="100%"
        maxHeight={28}
      >
        <HStack justifyContent="space-between">
          <Button
            color="gray.800"
            title="Back to edit"
            backColor="gray.300"
            leftIcon={
              <Icon as={Feather} name="arrow-left" size={4} color="gray.800" />
            }
            onPressColor="blue.900"
            size={48}
            onPress={handleBackEdit}
          />

          <Button
            color="gray.50"
            title="Publish"
            backColor="blue.600"
            leftIcon={<Icon as={Feather} name="tag" size={4} color="white" />}
            onPressColor="blue.900"
            size={48}
            onPress={() => console.log("Publish the Ad")}
          />
        </HStack>

        <Center pb={2} mt={4} flexShrink={0}>
          <Divider width={40} p={0.5} rounded="full" />
        </Center>
      </VStack>
    </ScrollView>
  );
};
