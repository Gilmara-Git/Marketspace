import { VStack, Center, FlatList, View , Text} from 'native-base';
import { HomeHeader } from '@src/components/HomeHeader';
import { HomeSubHeader } from '@src/components/HomeSubHeader';
import { HomeFilter } from '@src/components/HomeFilter';
import { products } from '@utils/products';
import { ProductCard } from '@components/ProductCard';
import { sneaker } from '@assets/red_sneaker.png';

export const Home =()=>{
    console.log('line10', typeof sneaker)
    return (
        <VStack bg='gray.200' flex={1}>
            <Center mt={8} py={6}>
                    <HomeHeader/>
                    <HomeSubHeader />
                    <HomeFilter />

                    <FlatList 
                        _contentContainerStyle={{justifyContent: 'space-between', alignItems: 'center'}}
                        data={products}
                        keyExtractor={(item)=>item.id}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        renderItem={({item})=> <ProductCard isNew={true} name={item.name} price={item.price} image=''/>}
                        />
          
                

            </Center>
        </VStack>
    )
};