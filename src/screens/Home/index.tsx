import {useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { VStack, Center, FlatList,Text } from 'native-base';
import { HomeHeader } from '@src/components/HomeHeader';
import { HomeSubHeader } from '@src/components/HomeSubHeader';
import { HomeFilter } from '@src/components/HomeFilter';
import { products } from '@utils/products';
import { ProductCard } from '@components/ProductCard';
import { Modal } from '@components/Modal';
import { AppRoutesNavigationTabProps } from '@routes/app.routes';
import { useNavigation } from '@react-navigation/native';


export const Home =()=>{
    
    const [ modalVisible, setModalVisible ] = useState(false);

    const navigation = useNavigation<AppRoutesNavigationTabProps>()

    const goToAdDetails =()=>{
        navigation.navigate('AdDetails');
    };
    
    const goToMyAds =()=>{
        navigation.navigate('MyAds')
    };

    const handleCreateAd = ()=>{
        navigation.navigate('AdCreate');
    };
    const onFilterClick =()=>{
        setModalVisible(true)
      
    };
    
    const closeModalCommand =()=>{
        setModalVisible(false);
    };
   
    useEffect(()=>{
        LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);
    },[])
    return (
        <VStack bg='gray.200' flex={1}>
            <Center mt={8} py={6}>
                    <HomeHeader uponClicking={handleCreateAd}/>
                    <HomeSubHeader uponClicking={goToMyAds}/>
                    <HomeFilter filterClick={onFilterClick} />

                    <Modal 
                        isOpen={modalVisible}
                        onCloseClick={closeModalCommand}
                      
                        />
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
                                    There is not Ads available!
                            </Text>
                        }
                        data={products}
                        keyExtractor={(item)=>item.id}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        renderItem={({item})=> 
                        <ProductCard 
                            isNew={false} 
                            name={item.name} 
                            price={item.price} 
                            image=''
                            isNotUserAd={true}
                            isAdActive={true}
                            onPress={goToAdDetails}
                            />}
                        
                        />
          

            </Center>
        </VStack>
    )
};