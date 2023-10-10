import { useState , useCallback, useEffect } from "react";
import {
  VStack,
  HStack,
  Box,
  Heading,
  Text,
  Image,
  Center,
  Divider,
  ScrollView,
  Icon,
  View,
  useToast
} from "native-base";

import { UserDisplay } from "@components/UserDisplay";
import { PaymentMethods } from "@components/PaymentMethods";
import { ImageOverlay } from '@components/ImageOverlay';
import { NavigationHeader } from '@components/NavigationHeader';

import { Button } from '@components/Button';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";
import { ImageSlider } from '@components/ImageSlider';
import { Loading } from '@components/Loading';
import { ArrowLeft , PencilSimpleLine} from 'phosphor-react-native';

import { useNavigation, useRoute , useFocusEffect} from '@react-navigation/native';
import { AppRoutesNavigationTabProps } from '@routes/app.routes';

import { api} from '@services/api'
import { AppError } from '@utils/AppError';
import { AllProductsDTO } from "@src/dtos/AllProductsDTO";


interface MyAdsDetailsParams {
    productId: string
}


export const MyAdsDetails = () => {

  const [ myProd, setMyProd ] = useState<AllProductsDTO>({} as AllProductsDTO);
  const [ isLoading, setIsLoading ] = useState(true);
  const toast = useToast();
  const route =  useRoute();
  const { productId }  = route.params as MyAdsDetailsParams;


  const navigation = useNavigation<AppRoutesNavigationTabProps>();

 const fetchMyAdsDetails = async()=>{
    try{
        setIsLoading(true);
        const { data } = await api.get(`/products/${productId}`);
        
        setMyProd({
            ...data,
            price: new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(data.price /100)

        })


    }catch(error){
        const isAppError = error instanceof AppError;
        toast.show({
            title: isAppError ? error.message: 'There was an error to search your products. Try again later.',
            placement: 'top',
            bg: 'red.400',
            duration: 3000
        })

    }finally{
        setIsLoading(false);
    };
 };
  
 const handleDeactivateActivateAd = async()=>{
    try{ 
        
        setIsLoading(true);
        
       
        await api.patch(`/products/${productId}`, { is_active: !myProd.is_active});
       

        fetchMyAdsDetails();
       
        toast.show({
            title: 'Your Ad has been updated!',
            placement: 'top',
            bg: 'tertiary.600',
            duration: 3000
        })

    }catch(error){
        const isAppError = error instanceof AppError;
        
        toast.show({
            title: isAppError ? error.message: 'There was an error to update your Ad',
            placement: 'top',
            bg: 'red.400',
            duration: 3000

        });
    }finally{
        setIsLoading(false);
    }


 };
 const handleGoback = ()=>{
    navigation.navigate('MyAds');
  };

  const goToEditAd =()=>{
   navigation.navigate('AdEdit');
  }


useFocusEffect((useCallback(()=>{
    fetchMyAdsDetails()
}, [productId, myProd.is_active])));

  return (
    <ScrollView
    _contentContainerStyle={{paddingBottom: 30}}
    showsVerticalScrollIndicator={false}
     >
        <NavigationHeader
            iconLeft={ArrowLeft}
            iconRight={PencilSimpleLine}
            leftIconClick={handleGoback}
            rightIconClick={goToEditAd}
            bgColor='gray.200'
        />

        <VStack bg='gray.200'>
            { isLoading ? <Loading/>  : 
            <View>
                <ImageSlider
                    productImages={myProd.product_images}
                    
                    />
                    
                    { !myProd.is_active && 
                    
                    <Heading 
                    fontFamily='heading' 
                    fontSize='sm'
                    position='absolute'
                    color='gray.50'
                    bottom={130}
                    left={150}
                    textTransform='uppercase'
                    >
                            Inactive Ad
                    </Heading>

                    }
           


                    { !myProd.is_active && 
                        <ImageOverlay />
                    
                    }

            </View>
            }
            <VStack px={6} pt={6}>
                <UserDisplay 
                    userAvatar={myProd?.user?.avatar}
                    userName={myProd?.user?.name} />
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
                                { myProd.is_new ? "New" : "Used"}
                            </Text>
                            </Box>
                        </HStack>

                        <HStack pb={1.5} justifyContent="space-between">
                            <Heading fontFamily="heading" fontSize="xl">
                            {myProd.name}
                            </Heading>
                            <Text fontFamily="heading" fontSize="xl" color="blue.600">
                                {myProd.price}
                            </Text>
                        </HStack>

                        <Text numberOfLines={4} fontFamily="body" fontSize="sm">
                            {myProd.description}
                        </Text>

                        <Heading mt={6} mb={5} fontFamily="heading" fontSize="sm">
                            Accept Trade ?  {myProd.accept_trade}
                            
                            <Text fontFamily="body" fontSize="sm">
                            {myProd.accept_trade ? "Yes" : "No"}
                            </Text>
                        </Heading>

                        <Heading mb={2} fontFamily="heading" fontSize="sm">
                            Methods of Payments:
                        </Heading>

                    { myProd.payment_methods?.map((method) => {
                        return <PaymentMethods  key={method.key}  method={method.key} />;
                    })}
                    </VStack>
            </VStack>

            <VStack px={6} py={6} bg='white' width='full' maxHeight={28}>
                       
                         
                            <Button
                                color='gray.50' 
                                title={ myProd.is_active ? 'Deactivate Ad' : 'Reactivate Ad'}
                                backColor={ myProd.is_active ? 'gray.900': 'blue.600'}
                                leftIcon={<Icon as={AntDesign} name='poweroff' size={3} color='gray.50'/>}
                                onPressColor='gray.800'
                                onPress={handleDeactivateActivateAd}
                                />

                                <View mb={2}/>

                            <Button
                                color='gray.800' 
                                title='Delete Ad'
                                backColor='gray.300'
                                leftIcon={<Icon as={Feather} name='trash' size={4} color='gray.600'/>}
                                onPressColor='gray.400'
                                onPress={()=>console.log('Delete Ad')}
                                />
            

                        <Center pb={2} mt={4}>
                            <Divider width={40} p={.5} rounded='full'/>

                        </Center>
            </VStack>
        </VStack>
    </ScrollView>
  );
};
