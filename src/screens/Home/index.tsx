import { VStack, Center } from 'native-base';
import { HomeHeader } from '@src/components/HomeHeader';
import { HomeSubHeader } from '@src/components/HomeSubHeader';

export const Home =()=>{
    return (
        <VStack>
            <Center mt={8} py={6}>
                <HomeHeader/>
                <HomeSubHeader />
            </Center>
        </VStack>
    )
};