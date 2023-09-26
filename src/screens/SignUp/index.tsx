import  { useState } from 'react';
import { VStack, Center, Text, ScrollView, Image, Heading, useToast,} from 'native-base';

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from 'react-hook-form';


import Logos from '../../../src/assets/logo.png';
import { AvatarHolder } from '@components/AvatarHolder'

import { Input } from '@components/Input/index';
import { Button }  from '@components/Button/index';
import { InputPassword } from '@components/InputPassword/index';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { useNavigation } from '@react-navigation/native';

import { api } from '@services/api';
import { AppError } from '@utils/AppError';

import { UserAuthHook } from '@hooks/UserAuthHook';

const signUpSchema = yup.object({
    name: yup.string().required('Type your name'),
    email: yup.string().required('Type your email').email('Type a valid email address'),
    tel: yup.string().required('Type your phone number in 10 digits').min(10, 'Ex: 974 568 3398'),
    password: yup.string().required().min(6, 'Password needs 6 digits.'),
    confirm_password: yup.string().required().oneOf([yup.ref('password')], 'Passwords do not match')

})
type FormData = yup.InferType<typeof signUpSchema>


export const SignUp =()=>{
    const [ isCreating, setIsCreating ] = useState(false);
    const [ isLogin, setIsLogin ] = useState(false);
    const [ userAvatar, setUserAvatar ] = useState('');
    const [ avatarType, setAvatarType ] = useState('');
    
    const {user, login} =  UserAuthHook();
    console.log(user, 'lina 45')

    const navigation = useNavigation();
    const toast = useToast();

    const selectUserAvatar = async ()=>{
        const pickedImage =  await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [5,5],
            quality: 1
        });

       if(pickedImage.canceled){
        return;
       }
       const avatar = pickedImage.assets[0].uri;
       const type = pickedImage.assets[0].type
       

       const verifyAvatarSize =  await FileSystem.getInfoAsync(avatar, { size: true})
       if(verifyAvatarSize.exists && (verifyAvatarSize.size /1024/1024) > 3){
           return toast.show({
               title: 'The Avatar image you have selected is too big!',
               placement: 'top',
               duration: 5000,
               bg: 'red.400'
            });
        }
        
        setUserAvatar(avatar);
        
        if(type === 'image'){
            setAvatarType(type)

        }

    };

    const handleCreateUser =  async (data : FormData)=>{
        console.log(data, 'line31 signup');
        try{
            setIsCreating(true);
            const imgExt = userAvatar.split('.').pop();
            console.log(imgExt, '85')    
            
           const photoFile = {
            name: `${data.name}.${imgExt}`.toLowerCase(),
            type:`${avatarType}/${imgExt}`,
            uri: userAvatar

           }as any;
      
                
            const userForm = new FormData();
            userForm.append('avatar', photoFile );
            userForm.append('name', data.name);
            userForm.append('email', data.email);
            userForm.append('tel', data.tel);
            userForm.append('password', data.password);

            console.log(userForm, 'linha101')
        //    create the api.post sending the 'userForm' , Content-type: multipart/form-data
            await api.post('/users', userForm, {
            headers: { 
                'Content-Type': 'multipart/form-data'
             }
           })

         

            await login(data.email, data.password)

        }catch(error){  
            const isAppError = error instanceof AppError;
            toast.show({
                title: isAppError ? error.message :  'There was an error creating your account. Upload your photo and all fields.',
                placement: 'top',
                duration: 5000,
                bg: 'red.400'
            })
            
            console.log(error)
          
        }finally{
        setIsCreating(false)
      }

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

                        <Center py={5} px={12}>
                           
                            <AvatarHolder 
                                uponClicking={selectUserAvatar}
                                imageUrl={userAvatar}
                                />

                            <VStack my={3}>
                                <Controller
                                    name='name'
                                    control={control}
                                    render={({ field: {onChange, value}})=>(
                                       <Input placeholder='Name'
                                            onChangeText={onChange}
                                            width={69}
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
                                            width={69}
                                            value={value}
                                            errorMessage={errors.email?.message}
                                            isInvalid={!!errors.email}
                                            />

                                    )}
                                />

                                <Controller 
                                    name='tel'
                                    control={control}
                                    render={({field: { onChange, value}})=>(
                                        <Input 
                                            placeholder='Phone number ex: 19745631290'
                                            onChangeText={onChange}
                                            width={69}
                                            value={value}
                                            errorMessage={errors.tel?.message}
                                            isInvalid={!!errors.tel}
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
                                    onPressColor='gray.800'
                               

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
                                        onPressColor='gray.400'
                                    />
                                </Center>
                            </VStack>
                        </Center>   
                        
                          
            </VStack>
        </ScrollView>
    )
};