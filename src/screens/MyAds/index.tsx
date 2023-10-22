import { useState , useCallback, useEffect } from 'react';
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
    const [ myFilteredProducts , setMyFilteredProducts ] = useState<MyProductsDTO[]>([]as MyProductsDTO[]);
    
    const { user } =  UserAuthHook();
   

   
 
    const navigation = useNavigation<AppRoutesNavigationTabProps>();

    const handleCreateAd = ()=>{
        navigation.navigate('AdCreate');
    };

   const goMyAdDetails = ( id: string)=>{
       navigation.navigate('MyAdsDetails', { productId: id });

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
    setMyFilteredProducts(data);

}

const handleFilteredProducts = ()=>{
    if(filterBy === 'all'){
        setMyFilteredProducts(myProducts);
    }else if(filterBy === 'active'){
        const activeProds = myProducts.filter((product)=> product.is_active === true);
        setMyFilteredProducts(activeProds)   
            
    }else {
        const inactiveProds = myProducts.filter((product)=> product.is_active === false);
        setMyFilteredProducts(inactiveProds)  
    }


};

useEffect(()=>{
    getUserProducts();

},[]);

useEffect(()=>{
    handleFilteredProducts();
},[ filterBy ]);

useFocusEffect(useCallback(()=>{
        getCurrentUser();
        getUserProducts();
        setFilterBy('all')
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
                showsVerticalScrollIndicator={false}
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
                data={myFilteredProducts}
                keyExtractor={(item)=> item.id }
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-around' }}
                renderItem={({item})=> 
                
                    <ProductCard 
                        id={item.id}
                        name ={item.name}
                        price={item.price}
                        is_new={String(item.is_new)}
                        is_active={item.is_active}
                        imageUrl={item.product_images[0]?.path}
                        productOwnerAvatar={user.avatar}
                        onPress={()=>goMyAdDetails(item.id)} 
                        /> 
                   
                    
                    }
                
                />
        </VStack>
        </>
    );
};