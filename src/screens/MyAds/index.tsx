import { useState , useCallback } from 'react';
import { VStack , HStack, Heading, FlatList, Select , Icon , Text, useToast } from 'native-base';

import { Entypo } from '@expo/vector-icons';
import { ProductCard } from '@src/components/ProductCard';
import { NavigationHeader } from '@components/NavigationHeader';

import { useNavigation, useFocusEffect  } from '@react-navigation/native';
import { AppRoutesNavigationTabProps } from '@routes/app.routes';
import { Plus } from 'phosphor-react-native';

import { api } from '@services/api';
import { AppError } from '@src/utils/AppError';
import { MyProductsDTO } from '@src/dtos/MyProductsDTO';
import { UserAuthHook } from '@hooks/UserAuthHook';


export const MyAds = ()=>{
    const [ filterBy, setFilterBy ] = useState('all');
    const toast = useToast();
    const [myProducts, setMyProducts] = useState<MyProductsDTO[]>([]as MyProductsDTO[]);
    const { user } =  UserAuthHook();
    
    
    // criar uma funcao para passar para o contexto, quantos Ads ativos do usuario, para que  rota HOME possa consumir
    // console.log(myProducts, 'filterBy')
 
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

const getUserProducts = async()=>{
    const  { data } = await api.get('/users/products');
    setMyProducts(data);

}


useFocusEffect(useCallback(()=>{
        getCurrentUser();
        getUserProducts();
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
           
                        <Heading fontFamily='body' fontSize='sm'>{myProducts?.length} Ad(s)</Heading>
                        
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
                data={myProducts}
                keyExtractor={(item)=> item.id}
                numColumns={2}
                renderItem={({item})=> 
                    <>
                    <ProductCard 
                        id={item.id}
                        name ={item.name}
                        price={item.price}
                        is_new={String(item.is_new)}
                        is_active={item.is_active}
                        imageUrl={item.product_images[0]?.path}
                        productOwnerAvatar={user.avatar}
                        onPress={goMyAdDetails} 
                        /> 
                   
                    </>
                    }
                
                />
        </VStack>
        </>
    );
};