import { useState , useCallback } from 'react';
import { LogBox } from 'react-native';
import { VStack , HStack, Heading, FlatList, Select , Icon , Text, useToast } from 'native-base';
import { my_products } from '@src/utils/my_products';


import { Entypo } from '@expo/vector-icons';
import { ProductCard } from '@src/components/ProductCard';
import { NavigationHeader } from '@components/NavigationHeader';

import { useNavigation, useFocusEffect  } from '@react-navigation/native';
import { AppRoutesNavigationTabProps } from '@routes/app.routes';
import { Plus } from 'phosphor-react-native';

import { api } from '@services/api';
import { AppError } from '@src/utils/AppError';


export const MyAds = ()=>{
    const [ filterBy, setFilterBy ] = useState('all');
    const toast = useToast();

    console.log(filterBy, 'filterBy')
    // params, mas acho que isso pode vir de product, porque o usuario tem que gravar no banco ativar or desavtivar o ad
    const isAdActive= true
  
    LogBox.ignoreLogs([''])
    const navigation = useNavigation<AppRoutesNavigationTabProps>();

    const handleCreateAd = ()=>{
        navigation.navigate('AdCreate');
    };

   const goMyAdDetails = ()=>{
       navigation.navigate('MyAdsDetails');

   };
   
   const getCurrentUser = async()=>{
    try{
        const currentUser = await api.get('/users/me');
        console.log(currentUser, 'Current User on MyAdsssss')

    }catch(error){
        const isAppError =  error instanceof AppError;
        toast.show({
            title: isAppError ?  error.message : 'A connection error occurred, could not communicate with the server!',
            placement: 'top',
            duration: 5000,
            bg: 'red.400'
        })
    }
   }

useFocusEffect(useCallback(()=>{
        getCurrentUser();
}, []))


    return (
        <>
        <NavigationHeader 
            title='My Ads'
            iconRight={Plus}
            rightIconClick={handleCreateAd}
            bgColor='gray.200'
            
        />
        <VStack py={8} bg='gray.200' px={6} flex={1} width='100%'>
            <HStack alignItems='center' justifyContent='space-between'>
           
                        <Heading fontFamily='body' fontSize='sm'>9 Ads</Heading>
                        
                        <Select 
                            dropdownOpenIcon={<Icon as={Entypo} name='chevron-small-up' />}
                            dropdownCloseIcon={<Icon as={Entypo} name='chevron-small-down' />}
                            placeholder="All" 
                            fontFamily='body'
                            fontSize='sm'
                            borderWidth={1}
                            borderColor='gray.300'
                            rounded={10}
                            placeholderTextColor='gray.900'
                            defaultValue='all'
                            selectedValue={filterBy} 
                            minWidth={32} 
                            accessibilityLabel="All" 
                            _selectedItem={{
                                bg: "gray.300",
                                endIcon: <Icon as={Entypo} name='chevron-small-down' />
                            }}  
                            onValueChange={(itemValue)=> setFilterBy(itemValue)}>
                            <Select.Item label="All" value="all" />
                            <Select.Item label="Active" value="active" />
                            <Select.Item label="Inactive" value="inactive" />
                        </Select>
                 
            </HStack>

            <FlatList 
                _contentContainerStyle={{ mt:'6'}}
                ListEmptyComponent={
                    <Text
                    my={6} 
                        fontFamily='heading'
                        fontSize='md'
                        color='blue.900'
                        >
                            You have no Ads available!
                    </Text>
                } 
                data={my_products}
                keyExtractor={(item)=> item.id}
                numColumns={2}
                renderItem={({item})=> 
                    <>
                    <ProductCard 
                        name={item.name}
                        price={item.price}
                        isNew={item.isNew} 
                        isNotUserAd={false} 
                        isAdActive={item.active} 
                        onPress={goMyAdDetails} 
                        /> 
                   
                    </>
                    }
                
                />
        </VStack>
        </>
    );
};