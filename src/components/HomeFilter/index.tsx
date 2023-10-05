import { useState } from 'react';
import { VStack, Text , IconButton, Divider } from 'native-base';
import { Input } from '@components/Input';
import { MaterialIcons , MaterialCommunityIcons } from '@expo/vector-icons';

type HomeFilterProps = {
    getQuery: (query: string)=> void;
    onOpenClick: ()=>void;

}

export const HomeFilter =({ getQuery,  onOpenClick }: HomeFilterProps)=>{
    const [ query, setQuery ] = useState('');

    const updateSearchQuery = (value: string)=>{
        setQuery(value);
    };

    console.log(query, 'query to search')

    return (
        <VStack mt={8}>
            <Text mb={2} fontFamily='body' fontSize='sm' color='gray.600'>Buy various products</Text>
            <Input 
                placeholder='Search Ads' 
                width={75} 
                onChangeText={updateSearchQuery}
                value={query}
                InputRightElement={
                    <>
                   
                    <IconButton
                        onPress={()=>getQuery(query)} 
                        _pressed={{bg: 'gray.200', opacity: .5}}
                        
                        _icon={{ 
                        as: MaterialIcons, 
                        name:'search',
                        size: 5,
                        color:'gray.800'
                    }} />
                
                    <Divider orientation='vertical' color='gray.400' height={5} thickness={1}/>


                    <IconButton
                          onPress={onOpenClick} 
                        _pressed={{bg: 'gray.200', opacity: .5}}
                        _icon={{
                            as: MaterialCommunityIcons, 
                            name:'filter-variant',
                            size: 5,
                            color:'gray.800'
                        }}
                    />
                
                    </>
                }
                />
        </VStack>
    )
};