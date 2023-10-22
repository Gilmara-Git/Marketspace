import { useState , useEffect } from "react";
import { LogBox } from "react-native";
import {
  VStack,
  HStack,
  Heading,
  Text,
  Center,
  Pressable,
  View,
  Switch,
  ScrollView,
  Divider,
  Skeleton,
  useToast,

} from "native-base";


import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { Input } from "@components/Input";
import { Plus } from "phosphor-react-native";
import { TextBox } from "@components/TextBox";
import { Button } from '@components/Button';
import { ButtonsRadio } from "@components/ButtonsRadio";
import { ProductImage } from "@src/components/ProductImage";
import { PaymentsCheckBox } from "@src/components/PaymentsCheckBox"; 
import { NavigationHeader } from "@src/components/NavigationHeader";

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { useNavigation, useRoute } from '@react-navigation/native';
import { AppRoutesNavigationTabProps } from '@routes/app.routes';
import { ArrowLeft } from 'phosphor-react-native';

import { api } from '@services/api';
import { UserAuthHook } from "@src/hooks/UserAuthHook";
import { AppError } from '@utils/AppError';

const EditSchema = yup.object().shape({
  name: yup.string().required("Type a title for your product."),
  description: yup.string().required('Please describe your product.'),
  is_new: yup.string().required("Please select if product is new or used."),
  price: yup.string().required('Please type your product price'),
  accept_trade: yup.boolean().required().default(false),
  payment_methods: yup.array().of(yup.string()
  .required('Choose one method of payment.')).default(['card']),
});

type FormData = yup.InferType<typeof EditSchema>;

interface AdEditParams {
  productId: string;
}


export const AdEdit = () => {
  
  const [ imagesLoaded, setImagesLoaded ] = useState<any[]>([]);
  const [ imageLoading, setImageLoading ] = useState(false);
  const { user } = UserAuthHook();

  
  const toast = useToast();
  const navigation = useNavigation<AppRoutesNavigationTabProps>();
  const route = useRoute();
  const { productId }  =  route.params as AdEditParams;

  
  const {
    reset,
    control, 
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(EditSchema),
    defaultValues: {
      is_new: '',
      payment_methods: [],
      accept_trade: false
    }
  });
  


  const loadAdToBeEdited = async()=>{
    const { data } = await api.get(`/products/${productId}`);

    const methods = data.payment_methods.map((method:{key:string, name: string})=>{return method.key});

    const productInfo = 
    { ...data,
      is_new: data.is_new ? 'new' : 'used',
      payment_methods: methods,
      price: String(Number(data.price)/100)
    }

    reset(productInfo)

    setImagesLoaded(data.product_images);

  };


  const handleGoback = ()=>{
    navigation.navigate('MyAdsDetails', { productId });
  
  };

  const handleImageRemove = async(id: string, uri: string)=>{
  

    try{

      if(imagesLoaded.length === 1){
        return toast.show({
          title: 'You must keep at least one image!',
          placement: 'top',
          bg: 'red.400',
          duration: 1000
        })
      }


  
    if(id){
     setImagesLoaded(prevState => prevState.filter(image => image.id !== id));
    //  const imageToRemove = [];
    //  imageToRemove.push(id);

    //  Needs to send the body { data: { } }
     await api.delete('products/images/', { 
      data: { 
        productImagesIds: [id]}
     });

    }
    
    if(uri){
      setImagesLoaded(prevState => prevState.filter(image => image.uri !== uri));
    }



    }catch(error){

      const isAppError =  error instanceof AppError;

      toast.show({
        title: isAppError ?  error.message : 'Could not delete one or more images.',
        placement: 'top',
        bg: 'red.400',
        duration: 1000
      })
    }
   
  };

  const ensurePriceHasCents = async( value: string)=>{
    const containsDot = value.split('').includes('.');
   return containsDot;
  
  }

  const handleAdEdit = async(data: any) =>{ 
    try{

    if(!data.payment_methods.length){
      return toast.show({
        title: 'You must provide at least one payment method!',
        placement: 'top',
        bg: 'red.400',
        duration: 1000
      })
    }
   

    if(!imagesLoaded.length){
      return toast.show({
        title: 'You must provide at least one Image!',
        placement: 'top',
        bg: 'red.400',
        duration: 1000
      })
    }
   
        const photoForm = new FormData();
        photoForm.append('product_id', productId);

        imagesLoaded.forEach(async item =>{
          if(item.uri){
            photoForm.append('images', item);
          
            await api.post('/products/images',
              photoForm,
              { headers: { 
                'Content-Type': 'multipart/form-data'}
            },
            )
            
          }
        }); 
   
      const validPrice = await ensurePriceHasCents(data.price);
      
      if (isNaN(data.price) || !validPrice) {
        return toast.show({
          title: "Only submit a Value and its Cents like:  345.66",
          placement: "top",
          bg: "red.400",
          duration: 3000,
        });
      };
      
      
       await api.put(`products/${productId}`, {
        name: data.name,
        description: data.description,
        is_new: data.is_new === 'new'? true: false,
        price: data.price * 100,
        accept_trade: data.accept_trade,
        payment_methods: data.payment_methods,
        product_images: imagesLoaded
       });

        navigation.navigate('MyAds')


      }catch(error){
        console.log(error)
        const isAppError = error instanceof AppError;

      toast.show({
        title: isAppError
          ? error.message
          : "An error occurred, Ad not created!",
        placement: "top",
        bg: "red.400",
        duration: 2000,
      });

      }


  };


  const handlePickedImages = async ()=>{

    try{
      setImageLoading(true);
   
      let pickedImages = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5,5],
        quality: 1
        
      });
      
      if(pickedImages.canceled){
        return
      }
         
            const { assets } = pickedImages;
           
            
            if(assets.length){
              
                  const file = await FileSystem.getInfoAsync(assets[0].uri, {size: true});
                  
                  if(file.exists && (file.size /1024/1024) > 5){
                      return toast.show({
                        title: 'One of more images are bigger than 5MB.',
                        placement: 'top',
                        duration: 2000,
                        bg: 'red.400'
                      })
                  
                }
                
              
                  const imageExt = assets[0].uri.split(".").pop();
      
                  const photoFile = {
                    name: `${user.name}.${imageExt}`.toLowerCase(),
                    type: `${assets[0].type}/${imageExt}`,
                    uri:  `${assets[0].uri}`,
                  } as any;
                  
              
           
                  setImagesLoaded((prev)=>[...prev, photoFile]);

            }
           
        
   
          
    
     

    }
    catch(error){
      console.log(error);
      throw error;

    }finally{
      setImageLoading(false);
    }
    
  };

  useEffect(()=>{
    loadAdToBeEdited();
  },[productId, reset ]);

    useEffect(()=>{
      LogBox.ignoreLogs([
        "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
      ]);
    },[])
   
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
        <NavigationHeader 
          iconLeft={ArrowLeft}
          leftIconClick={handleGoback}
          title='Edit Ad'
          bgColor="gray.200"
          />

      <VStack bg="gray.200" px={6} pt={6} flex={1} pb={4}>
        <Heading fontFamily="heading" fontSize="md" pb={2}>
          Images
        </Heading>
        <Text pb={4} numberOfLines={2} fontFamily="body" fontSize="sm">
          Choose up to 3 images to show your incredible product! So a Edit
        </Text>
        <HStack pb={8}>

     
          { (imagesLoaded?.length === undefined || imagesLoaded.length <=2) &&
          
                <Pressable
                rounded={16}
                onPress={handlePickedImages}
                _pressed={{ bg: "gray.400" }}
                isPressed={true}
                >
                  <Center width={28} height={28} bg="gray.300" rounded={4}>
                    <Plus color="#9F9BA1" size={25} />
                  </Center>

                </Pressable>

}

{ imageLoading && ( 
            <Skeleton 
                ml={2}
                speed={1}
                fadeDuration={0.1}
                width={28} 
                height={28}  
                rounded={4} 
                startColor='gray.300' 
                endColor='gray.200'   
                        />



)}

      { imagesLoaded?.map((item, index)=>(

        <ProductImage
          key={index}
          url={ item.uri || `${api.defaults.baseURL}/images/${item.path}`}
          onRemoveClick={()=>handleImageRemove(item.id, item.uri)}
        />
      ))}
    

           
        </HStack>

        <VStack>
          <Heading fontFamily="heading" fontSize="md">
            About the product
          </Heading>
          <View>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Product name"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                  isInvalid={!!errors.name}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field: { value, onChange } }) => (
                <TextBox
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <Controller
              name="is_new"
              control={control}
              render={({ field: { value, onChange } }) => (
                <ButtonsRadio
                  accessibilityLabel="product status"
                  name="is_new"
                  onChange={onChange}
                  value={value}
                  errorMessage={errors.is_new?.message}
                  isInvalid={!!errors.is_new}
                />
              )}
            />

            <Heading pt={8} pb={3} fontFamily="heading" fontSize="md">
              Price
            </Heading>

            <Controller
              name="price"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  isInvalid={!!errors.price}
                  errorMessage={errors.price?.message}
                  keyboardType="numeric"
                  onChangeText={onChange}
                  value={value}
                  placeholder="Product value ex: 1000.00"
                  placeholderTextColor="gray.400"
                  InputLeftElement={
                    <Text pl={4} fontFamily="body" fontSize="md">
                      U$
                    </Text>
                  }
                />
              )}
            />

            <VStack mb={6}>
              <Heading mt={6} mb={4} fontFamily="heading" fontSize="sm">
                Accept trade ?
              </Heading>

              <HStack>
                <Controller 
                  control={control}
                    name='accept_trade'
                    render={({ field: { value, onChange } }) => (
                      <Switch
                        value={value}
                        onValueChange={onChange}
                        size="lg"
                        onTrackColor="blue.600"
                      />

                    )}
                
                />
              </HStack>
            </VStack>

            <Heading mb={6} fontFamily="heading" fontSize="sm">
              Methods of payments accepted
            </Heading>

            <View>
                <Controller 
                  name='payment_methods'
                  control={control}
                  rules={{required: true}}
                  render={ ( {field: { value, onChange }})=>(
                    <PaymentsCheckBox
                      value={value}
                      onChange={onChange}
                      defaultValue={value}
                      
                    />
                    
                    
                  )}
                    />

                    { errors?.payment_methods && 
                      <Text
                        color='red.400'
                        fontFamily='body'
                        fontSize='sm'
                      >
                        {errors.payment_methods.message}
                      </Text> }
                
            </View>
          </View>
        </VStack>
      </VStack>

      <HStack pt={4} bg='gray.50'justifyContent='space-around' flex={1}>
                <Button 
                    title='Cancel'
                    size={46}
                    backColor='gray.300'
                    color='gray.800'
                    onPressColor='gray.400'
                    onPress={handleGoback}
                />
                <Button 
                    title='Next'
                    size={46}
                    backColor="gray.900"
                    color='gray.50'
                    onPressColor='gray.600'
                    onPress={handleSubmit(handleAdEdit)}
                />
            </HStack>

            <Center pb={2} mt={4} flexShrink={0}>
                        <Divider width={40} p={.5} rounded='full'/>
                    </Center>

            
    </ScrollView>
  );
};
