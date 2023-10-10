import {useState, useEffect, useCallback } from 'react';
import { LogBox  } from 'react-native';
import { VStack, Center, FlatList,Text, useToast, View } from 'native-base';
import { HomeHeader } from '@src/components/HomeHeader';
import { HomeSubHeader } from '@src/components/HomeSubHeader';
import { HomeFilter } from '@src/components/HomeFilter';
import { Loading } from '@components/Loading';

import { ProductCard } from '@components/ProductCard';
import { Modal } from '@components/Modal';
import { AppRoutesNavigationTabProps } from '@routes/app.routes';
import { useNavigation, useFocusEffect } from '@react-navigation/native';


import  { api } from '@services/api';
import { AppError } from '@utils/AppError';
import  { AllProductsDTO } from '@src/dtos/AllProductsDTO';

export const Home =()=>{
    const [products , setProducts ] = useState<AllProductsDTO[]>();
    const [ isProductLoading, setIsProductLoading ] = useState(false);
    const [ modalVisible, setModalVisible ] = useState(false);

    const [is_newFilter, setIs_newFilter] = useState<boolean | undefined>(undefined);
    const [accept_trade, setAccept_trade] = useState<boolean | undefined>(undefined);
    const [payment_methods, setPayment_methods ] = useState<string[] | undefined>([]);
    const [ query, setQuery ] = useState<string>('');
  
    
    const toast = useToast();
    const navigation = useNavigation<AppRoutesNavigationTabProps>();

    const fetchAllProducts = async()=>{
        try{
            
            setIsProductLoading(true);

            const {  data } = await api.get('/products', {
                params: {
                    is_new: is_newFilter,
                    accept_trade,
                    payment_methods,
                    query
            }
        }

        );
             
            setProducts(data);

        }catch(error){
            const isAppError = error instanceof AppError;
            
            toast.show({
                title: isAppError ? error.message : 'There was an error to fetch products',
                placement: 'top',
                bg: 'red.400',
                duration: 3000

            })

        }finally{
            setIsProductLoading(false);

        }
    }

    const goToAdDetails =( id: string)=>{
        navigation.navigate('AdDetails', { productId: id });
    };
    
    const goToMyAds =()=>{
        navigation.navigate('MyAds')
    };

    const handleCreateAd = ()=>{
        navigation.navigate('AdCreate');
    };

    
    const onSearchString =( query: string)=>{
       setQuery(query);
        
    };
    const openModalCommand = ()=>{
        setModalVisible(true)

    };

    const closeModalCommand =()=>{
        setModalVisible(false);
    };
   
   
    useEffect(()=>{
        LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);
    },[])

    useFocusEffect(useCallback(()=>{
        fetchAllProducts();
    }, [is_newFilter, accept_trade, payment_methods, query]));
    
    return (
        <VStack bg='gray.200' flex={1}>
            <Center mt={8} py={6}>
                    <HomeHeader uponClicking={handleCreateAd}/>
                    <HomeSubHeader uponClicking={goToMyAds}/>


                    
                    <HomeFilter 
                        getQuery={onSearchString}
                        onOpenClick={openModalCommand}
                        />

                    <Modal 
                        isOpen={modalVisible}
                        onCloseClick={closeModalCommand}
                        onOpenClick={openModalCommand}
                        onIsNewChanged={setIs_newFilter}
                        isNewFilter={is_newFilter}
                        onAcceptTradeChange={setAccept_trade}
                        acceptTrade={accept_trade}
                        onPaymentMethodsChanged={setPayment_methods}
                        paymentMethods={payment_methods}
                      
                        />




                        { isProductLoading ? 

                            <>
                            <View mt={20}/>
                            <Loading /> 
                            </>

                        
                   
                        :
                          
                            <FlatList 
                                _contentContainerStyle={{ marginTop: 2, paddingBottom: 100}}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={
                                    <Text
                                        my={6} 
                                        fontFamily='heading'
                                        fontSize='md'
                                        color='blue.900'
                                        >
                                            There are not ADs to show!
                                    </Text>
                                }
                                data={products}
                                keyExtractor={(item)=>item.id}
                                numColumns={2}
                                columnWrapperStyle={{ justifyContent: 'space-between' }}
                                renderItem={({item})=> 
                                <ProductCard 
                                    id={item.id}
                                    is_new={String(item.is_new)} 
                                    name={item.name} 
                                    price={String(item.price)} 
                                    imageUrl={item.product_images[0]?.path}
                                    productOwnerAvatar={item.user.avatar}
                                    is_active={true}
                                    onPress={()=>goToAdDetails(item.id)}
                                    />}
                                
                                />
                    }

            </Center>
        </VStack>
    )
};