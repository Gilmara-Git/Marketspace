import  { useState } from 'react';
import { VStack, Center, Text, ScrollView, Image, Heading } from 'native-base';

import * as yup from "yup";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";


import Logos from '@assets/logo.png';
import { AvatarHolder } from '@components/AvatarHolder'

import { Input } from '@components/Input/index';
import { Button }  from '@components/Button/index';
import { InputPassword } from '@components/InputPassword/index';

import { useNavigation } from '@react-navigation/native';

const signUpSchema = yup.object({
    name: yup.string().required('Type your name'),
    email: yup.string().required('Type your email').email('Type a valid email address'),
    phone: yup.string().required('Type your phone number in 10 digits').min(10, 'Ex: 974 568 3398'),
    password: yup.string().required('Type a 6 digits password').min(6, 'Password needs 6 digits.'),
    confirm_password: yup.string().required('Confirm your password').oneOf([yup.ref('password')], 'Passwords do not match')

})
type FormData = yup.InferType<typeof signUpSchema>

export const SignUp =()=>{
    const [ isCreating, setIsCreating ] = useState(false);
    const [ isLogin, setIsLogin ] = useState(false);
    const navigation = useNavigation();

    const handleCreateUser = (data : FormData)=>{
        console.log(data, 'line31 signup')
        setIsCreating(true);
    };
    
    const handleLogin =()=>{
        navigation.goBack();
        setIsLogin(true)
    };
    
    const { control, handleSubmit , formState: {errors} } = useForm<FormData>({
        resolver: yupResolver(signUpSchema)
    }
    );
   
      
    return ( 
        <ScrollView 
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ backgroundColor:'gray.200'}}
            
            >
            <VStack flex={1} pt={12} width='100%' pb={40}>
              
                        <Center mt={4} px={12}>
                                <Image source={Logos} height={10} width={15}alt='Logo'/>
                                <Heading my={3} letterSpacing={2} fontSize='xl' fontFamily='heading'>Welcome!</Heading>
                                <Text 
                                    textAlign='center'
                                    numberOfLines={2}
                                    fontSize='sm' 
                                    fontFamily='body' 
                                    letterSpacing={0.2}>Create your account and use this space to buy various items and sell your products.</Text>
                           
                        </Center>

                        <Center py={8} px={12}>
                            <AvatarHolder />

                            <VStack my={3}>
                                <Controller
                                    name='name'
                                    control={control}
                                    render={({ field: {onChange, value}})=>(
                                       <Input placeholder='Name'
                                            onChangeText={onChange}
                                            value={value}
                                            errorMessage={errors.name?.message}
                                            isInvalid={!!errors.name}
                                       />
                                   )}
                                />

                                <Controller
                                    name='email'
                                    control={control}
                                    render={({field: { onChange, value}})=>(
                                        <Input 
                                            placeholder='E-mail'
                                            onChangeText={onChange}
                                            value={value}
                                            errorMessage={errors.email?.message}
                                            isInvalid={!!errors.email}
                                            />

                                    )}
                                />

                                <Controller 
                                    name='phone'
                                    control={control}
                                    render={({field: { onChange, value}})=>(
                                        <Input 
                                            placeholder='Phone number ex: 9745631290'
                                            onChangeText={onChange}
                                            value={value}
                                            errorMessage={errors.phone?.message}
                                            isInvalid={!!errors.phone}
                                            />

                                    )}
                                />

                                <Controller 
                                    name='password'
                                    control={control}
                                    render={({ field: { onChange, value}})=>(
                                        <InputPassword 
                                            placeholder='Password'
                                            onChangeText={onChange}
                                            value={value}
                                            errorMessage={errors.password?.message}
                                            isInvalid={!!errors.password}
                                            />

                                    )}
                                />

                                <Controller
                                    name='confirm_password'
                                    control={control}
                                    render={({ field: { onChange, value}})=>(
                                        <InputPassword 
                                            placeholder='Confirm Password'
                                            onChangeText={onChange}
                                            value={value}
                                            errorMessage={errors.confirm_password?.message}
                                            isInvalid={!!errors.confirm_password}
                                            returnKeyType='send'
                                            onSubmitEditing={handleSubmit(handleCreateUser)}
                                            />

                                    )}
                                />
                                <Button 
                                    title='Create' 
                                    backColor='gray.900' 
                                    color='gray.50' 
                                    size={69} 
                                    mt={3}
                                    isLoading={isCreating}
                                    onPress={handleSubmit(handleCreateUser)}
                                    _pressed={{bg: 'gray.800'}}
                               

                                />

                            </VStack>

                            <VStack mt={8}>
                                <Center>
                                    <Text 
                                        fontFamily='body' 
                                        fontSize='sm'>Already have an account?
                                    </Text>
                                    <Button 
                                        mt={5} 
                                        title='Go to login' 
                                        backColor='gray.300' 
                                        color='gray.800' 
                                        size={69}
                                        isLoading={isLogin}
                                        _loading={{bg: 'gray.400'}}
                                        _spinner={{color: 'gray.900'}}
                                        _pressed={{bg: 'gray.500'}}
                                        onPress={handleLogin}
                                    />
                                </Center>
                            </VStack>
                        </Center>           
            </VStack>
        </ScrollView>
    )
};