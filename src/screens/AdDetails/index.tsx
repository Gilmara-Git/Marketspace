import { useState } from 'react';
import { ScrollView } from 'react-native';
import { VStack, HStack, View, Image, Heading, Text , Box, Icon, Divider, Center,} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import Bicycle from '@assets/bicycle.png';

import { UserDisplay } from '@components/UserDisplay';
import { PaymentMethods } from '@components/PaymentMethods';
import { Button } from '@components/Button';
import { LineDivider } from '@src/components/LineDivider';



export const AdDetails = ()=>{
    const [ payments, setPayments] = useState(['Bill', 'Zelle','Cash', 'Deposit' ]);

    // fake isNew, this will come from products in the AdDetails params 

    const isNew =  true
    const acceptTrade =  false;
  

    return (
      
        <ScrollView
        showsVerticalScrollIndicator={false}
        
         >
            <VStack bg='gray.50'>
                <View>
                    <Image
                        width='100%'
                        source={Bicycle} 
                        defaultSource={Bicycle}
                        height='280'  
                        resizeMode='cover'
                        alt='Product photo'
                        />
                    <LineDivider/>
                </View>

                <VStack px={6} mt={6}>

                <UserDisplay />

                            <VStack>
                                <HStack pb={2}>
                                    <Box 
                                        bg='gray.300' 
                                        rounded='full'
                                        px={1.5}
                                        py={1}
                                        
                                        >
                                            <Text 
                                                px={1} 
                                                fontFamily='heading'
                                                fontSize='2xs' 
                                                color='gray.800'
                                                textTransform='uppercase'
                                                >
                                                    {isNew ? 'New': 'Used'}

                                            </Text>
                                        
                                    </Box>
                                </HStack>

                                <HStack pb={1.5} justifyContent='space-between'>
                                    <Heading fontFamily='heading' fontSize='xl'>Bicycle</Heading>
                                    <Text fontFamily='heading' fontSize='xl' color='blue.600'><Text fontSize='sm'>u$</Text> 120.00</Text>
                                </HStack>
                                
                                <Text  
                                    numberOfLines={4} 
                                    fontFamily='body'
                                    fontSize='sm'
                                    >
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum dicta voluptatibus deleniti. 
                                        Laudantium est voluptate quae odio quaerat beatae a ad assumenda ducimus minima numquam, consequuntur, 
                                        iusto quibusdam! Laborum, vero!
                                </Text>

                                <Heading 
                                    mt={6}
                                    mb={5}
                                    fontFamily='heading'
                                    fontSize='sm'
                                    >
                                        Accept Trade ?  <Text fontFamily='body'fontSize='sm'>{acceptTrade? 'Yes': 'No'}</Text>
                                </Heading>

                                <Heading
                                    mb={2} 
                                    fontFamily='heading' 
                                    fontSize='sm'>
                                        Methods of Payments:
                                </Heading>
                                
                                { payments.map(method =>{
                                    
                                    return <PaymentMethods  method={method}/>

                                })}
                               
                            </VStack>

                
                    </VStack>
                

            </VStack>
                <VStack px={6} py={6} bg='white' width='full' maxHeight={28}>
                    <HStack justifyContent='space-between'>
                        <Heading color='blue.900' fontFamily='body'><Text>u$</Text> 120.00</Heading>
                        <Button
                           color='gray.50' 
                            title='Contact us'
                            backColor='blue.600'
                            leftIcon={<Icon as={Ionicons} name='logo-whatsapp' size={4} color='white'/>}
                            onPressColor='blue.900'
                            size={48}
                            onPress={()=>console.log('Contact us button')}
                            />
                    </HStack>

                    <Center pb={2} mt={4} flexShrink={0}>
                        <Divider width={40} p={.5} rounded='full'/>

                    </Center>
                </VStack>
        </ScrollView>
    )
};