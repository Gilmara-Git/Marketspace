import { useState } from "react";
import {
  VStack,
  HStack,
  Box,
  Heading,
  Text,
  Image,
  Center,
  Divider,
  ScrollView,
  Icon,
  View
} from "native-base";
import chandelier from "@assets/chandelier.png";
import { UserDisplay } from "@components/UserDisplay";
import { PaymentMethods } from "@components/PaymentMethods";
import { ImageOverlay } from '@components/ImageOverlay';
import { LineDivider } from "@src/components/LineDivider";

import { Button } from '@components/Button';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";

export const MyAdsDetails = () => {
  // this is will come from backend
  const [payments, setPayments] = useState([
    "Bill",
    "Zelle",
    "Cash",
    "Deposit",
  ]);

  //params
  // if isActive === false product photo is darker and replace button Deactivate Ad to Activate Ad
  const isActive = true;
  const isNew = true;
  const acceptTrade = true;
  const isAdActive = true;

  return (
    <ScrollView
    _contentContainerStyle={{paddingBottom: 30}}
    showsVerticalScrollIndicator={false}
     >
        <VStack bg='gray.200'>
            <View>

                <Image
                    source={chandelier}
                    defaultSource={chandelier}
                    alt="product"
                    width="100%"
                    resizeMode="cover"
                    height="280"
                    />
                    
                    { !isAdActive && 
                    
                    <Heading 
                    fontFamily='heading' 
                    fontSize='sm'
                    position='absolute'
                    color='gray.50'
                    bottom={130}
                    left={150}
                    textTransform='uppercase'
                    >
                            Inactive Ad
                    </Heading>

                    }
                    <LineDivider/>


                    { !isAdActive && 
                        <ImageOverlay />
                    
                    }

            </View>
            <VStack px={6} pt={6}>
                <UserDisplay />
                    <VStack>
                        <HStack pb={2}>
                            <Box bg="gray.300" rounded="full" px={1.5} py={1}>
                            <Text
                                px={1}
                                fontFamily="heading"
                                fontSize="2xs"
                                color="gray.800"
                                textTransform="uppercase"
                            >
                                {isNew ? "New" : "Used"}
                            </Text>
                            </Box>
                        </HStack>

                        <HStack pb={1.5} justifyContent="space-between">
                            <Heading fontFamily="heading" fontSize="xl">
                            Chandelier
                            </Heading>
                            <Text fontFamily="heading" fontSize="xl" color="blue.600">
                            <Text fontSize="sm">u$</Text> 345.00
                            </Text>
                        </HStack>

                        <Text numberOfLines={4} fontFamily="body" fontSize="sm">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum
                            dicta voluptatibus deleniti. Laudantium est voluptate quae odio
                            quaerat beatae a ad assumenda ducimus minima numquam, consequuntur,
                            iusto quibusdam! Laborum, vero!
                        </Text>

                        <Heading mt={6} mb={5} fontFamily="heading" fontSize="sm">
                            Accept Trade ?{" "}
                            <Text fontFamily="body" fontSize="sm">
                            {acceptTrade ? "Yes" : "No"}
                            </Text>
                        </Heading>

                        <Heading mb={2} fontFamily="heading" fontSize="sm">
                            Methods of Payments:
                        </Heading>

                    {payments.map((method) => {
                        return <PaymentMethods method={method} />;
                    })}
                    </VStack>
            </VStack>

            <VStack px={6} py={6} bg='white' width='full' maxHeight={28}>
                       
                         
                            <Button
                                color='gray.50' 
                                title={ isAdActive ? 'Deactivate Ad' : 'Reactivate Ad'}
                                backColor={ isAdActive ? 'gray.900': 'blue.600'}
                                leftIcon={<Icon as={AntDesign} name='poweroff' size={3} color='gray.50'/>}
                                onPressColor='gray.800'
                                onPress={()=>console.log('toggle Add active/inactive')}
                                />

                                <View mb={2}/>

                            <Button
                                color='gray.800' 
                                title='Delete Ad'
                                backColor='gray.300'
                                leftIcon={<Icon as={Feather} name='trash' size={4} color='gray.600'/>}
                                onPressColor='gray.400'
                                onPress={()=>console.log('Delete Ad')}
                                />
            

                        <Center pb={2} mt={4}>
                            <Divider width={40} p={.5} rounded='full'/>

                        </Center>
            </VStack>
        </VStack>
    </ScrollView>
  );
};
