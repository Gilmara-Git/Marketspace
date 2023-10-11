import { useState } from 'react';
import { ScrollView, Platform, LogBox } from "react-native";
import {
  VStack,
  HStack,
  Heading,
  Text,
  Box,
  Icon,
  Divider,
  Center,
  useToast

} from "native-base";
import { Feather } from "@expo/vector-icons";


import { UserDisplay } from "@components/UserDisplay";
import { PaymentMethods } from "@components/PaymentMethods";
import { Button } from "@components/Button";
import { ImageSlider } from '@components/ImageSlider';
import  { Loading } from '@components/Loading';


import { useNavigation, useRoute } from "@react-navigation/native";
import { AppRoutesNavigationTabProps } from "@routes/app.routes";
import { ProductDTO } from "@src/dtos/ProductDTO";
import { UserAuthHook } from '@src/hooks/UserAuthHook';
import { api } from '@services/api'; 
import { AppError } from '@utils/AppError';



export const AdPreview = () => {
  LogBox.ignoreLogs([
    "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
  ]);
  
  const [ isCreatingProduct, setIsCreatingProduct ] = useState(false);
  const toast = useToast();

  const { user }  =  UserAuthHook();
  const navigation = useNavigation<AppRoutesNavigationTabProps>();
  
  const { params } = useRoute();
  const {
    name,
    description,
    is_new,
    accept_trade,
    payment_methods,
    price,
    product_images,
  } = params as ProductDTO;
  
  // console.log(product_images, 'linha56 na AdPreview')
  const formattedPrice  = new Intl.NumberFormat('en-US',  {
    style: 'currency', 
    currency: 'USD',
  } ).format(Number(price));
  

  
  const handleGoback = () => {
    navigation.navigate('AdCreate');
  };
  
  const handlePublishProduct = async()=>{
    const priceToDb = Number(price) * 100;

  try{
    setIsCreatingProduct(true)
    const { data } : any = await api.post('/products', { 
      name,
      description,
      is_new,
      price: priceToDb, 
      accept_trade,
      payment_methods,
    }
      
      );
  
    
      const productForm = new FormData();
      productForm.append('product_id', data.id )
      
      product_images.forEach(photoFile =>{
        return productForm.append('images', photoFile)
      });
      
      const prodImages = await api.post('/products/images', 
        productForm, 
        { headers:{ 
          'Content-Type': 'multipart/form-data'}
      }, 
        
      );
  
  
      navigation.navigate('MyAds');

  }catch(error){

    const isAppError =  error instanceof AppError;
    toast.show({
      title: isAppError ? error.message: 'An error occurred while creating your product',
      placement: 'top',
      bg: 'red.400',
      duration: 3000
    })
    console.log(error)

  }finally{
    setIsCreatingProduct(false);
  }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator = {false}
    >
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
      <VStack bg="gray.50" width='100%'>

        { isCreatingProduct ? 
        
          <Loading /> :
          
         <ImageSlider productImages={product_images} />
        }
      
    
        <VStack px={6} mt={6}>
          <UserDisplay 
            userName={user.name}
            userAvatar={user.avatar}
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
                  { is_new ? "New" : "Used"}
                </Text>
              </Box>
            </HStack>

            <HStack pb={1.5} justifyContent="space-between">
              <Heading fontFamily="heading" fontSize="xl">
                {name}
              </Heading>
              <Text fontFamily="heading" fontSize="xl" color="blue.600">
              
                 {formattedPrice}
                </Text>
            </HStack>

            <Text numberOfLines={4} fontFamily="body" fontSize="sm">
              {description}
            </Text>

            <Heading mt={6} mb={5} fontFamily="heading" fontSize="sm">
              Accept Trade ?{" "}
              <Text fontFamily="body" fontSize="sm">
                {accept_trade ? "Yes" : "No"}
              </Text>
            </Heading>

            <Heading mb={2} fontFamily="heading" fontSize="sm">
              Methods of Payments:
            </Heading>

            {payment_methods.map((method) => {
              // const methodsFormat: { [key: string]: string } = {
              //   card: "Credit Card",
              //   pix: "Zelle",
              //   boleto: "Bill",
              //   cash: "Cash",
              //   deposit: "Deposit"
              // };

              return (
                <PaymentMethods key={method} method={method} />
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
            title="Back"
            backColor="gray.300"
            leftIcon={
              <Icon as={Feather} name="arrow-left" size={4} color="gray.800" />
            }
            onPressColor="blue.900"
            size={48}
            onPress={handleGoback}
          />

          <Button
            color="gray.50"
            title="Publish"
            backColor="blue.600"
            leftIcon={<Icon as={Feather} name="tag" size={4} color="white" />}
            onPressColor="blue.900"
            size={48}
            onPress={handlePublishProduct}
          />
        </HStack>

        <Center pb={2} mt={4} flexShrink={0}>
          <Divider width={40} p={0.5} rounded="full" />
        </Center>
      </VStack>
      </ScrollView>
  );
};
