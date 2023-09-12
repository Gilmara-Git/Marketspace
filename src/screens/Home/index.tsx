import {useState } from 'react';
import { VStack, Center, FlatList,Text } from 'native-base';
import { HomeHeader } from '@src/components/HomeHeader';
import { HomeSubHeader } from '@src/components/HomeSubHeader';
import { HomeFilter } from '@src/components/HomeFilter';
import { products } from '@utils/products';
import { ProductCard } from '@components/ProductCard';
import { Modal } from '@components/Modal';


export const Home =()=>{
 
    const [ modalVisible, setModalVisible ] = useState(false);
    
    const onFilterClick =()=>{
        setModalVisible(true)
      
    };
    
    const closeModalCommand =()=>{
        setModalVisible(false);
    };
   
    return (
        <VStack bg='gray.200' flex={1}>
            <Center mt={8} py={6}>
                    <HomeHeader/>
                    <HomeSubHeader />
                    <HomeFilter filterClick={onFilterClick} />

                    <Modal 
                        isOpen={modalVisible}
                        onCloseClick={closeModalCommand}
                      
                        />
                    <FlatList 
                        contentContainerStyle={{flex:1, }}
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
                        _contentContainerStyle={{justifyContent: 'space-between', alignItems: 'center', marginTop: 1.5 }}
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
                            />}
                        
                        />
          

            </Center>
        </VStack>
    )
};