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

type ImagesType = {
  url: string
}[];

export const AdEdit = () => {
  
  const [imagesInPhotoFile, setImagesInPhotoFile] = useState<any[]>([]);
  const [ adInfo, setAdInfo ] = useState();

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
  });


  const loadAdToBeEdited = async()=>{
    const { data } = await api.get(`/products/${productId}`);
    console.log(typeof data.price, 'linha88')

    setAdInfo({
      ...data,
      price: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(data.price/100)
    })

  };


  const handleGoback = ()=>{
    
    navigation.navigate('MyAdsDetails', { productId });
  };

  const handleImageRemove = (uri: string)=>{
    const currentImages = imagesInPhotoFile;
    const filteredImages = currentImages?.filter(images => images.url !== uri);
    setImagesInPhotoFile(filteredImages);
   
  };



  const ensurePriceHasCents = async( value: string)=>{
    const containsDot = value.split('').includes('.');
   return containsDot;
  
  }

  const handleAdCreate = async(data: any) =>{

      try{
        
        if (!imagesInPhotoFile.length) {
          return toast.show({
            title: "Please select at least one image for your product.",
            placement: "top",
            bg: "red.400",
            duration: 1000,
          });
        }


        const validPrice = await ensurePriceHasCents(data.price);
    
        if (isNaN(data.price) || !validPrice) {
          return toast.show({
            title: "Please enter a price showing CENTS. Ex: 1000.45",
            placement: "top",
            bg: "red.400",
            duration: 1000,
          });
        };
    
        data.is_new = data.is_new === "new" ? true : false;
        data.price = Number(data.price);
        data.product_images = imagesInPhotoFile;
    
        navigation.navigate('AdPreview', data)


      }catch(error){
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
        allowsEditing: false,
        selectionLimit: 3,
        orderedSelection:true,
        aspect: [5,5],
        allowsMultipleSelection: true,
        quality: 1
        
      });
      
      if(pickedImages.canceled){
        return
      }
         
            const { assets } = pickedImages;
         
            let selectedImages:any = [];
            let validatedImages : any = [];
            
            if(assets.length){
              assets.forEach((asset)=>{
                return selectedImages.push({ url: asset.uri})
              })

            }
           
            for( let image of selectedImages){
              const file = await FileSystem.getInfoAsync(image.url, {size: true});
              
              if(file.exists && (file.size /1024/1024) > 5){
                  return toast.show({
                    title: 'One of more images are bigger than 5MB.',
                    placement: 'top',
                    duration: 2000,
                    bg: 'red.400'
                  })

              }
              
            
              if(!validatedImages.includes({ url: image.url } )){
                validatedImages.push( { url: image.url})

              }

            }

            const imagesToStorage = validatedImages.map((image: any) => {
              const imageExt = image.url.split(".").pop();
      
              const photoFile = {
                name: `${user.name}.${imageExt}`.toLowerCase(),
                type: `${image.type}/${imageExt}`,
                uri: `${image.url}`,
              };
      
              return photoFile;
            });
          

            setImagesInPhotoFile((prev)=>[...prev, ...imagesToStorage]);
    
     

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

    },[productId])

    useEffect(()=>{
      LogBox.ignoreLogs([
        "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
      ]);
    },[])
    //passed isPressed={true} manually for now
  return (
    <ScrollView>
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

     
          { (imagesInPhotoFile?.length === undefined || imagesInPhotoFile.length <=2) &&
          
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

      { imagesInPhotoFile?.map(item=>(

        <ProductImage
          key={item.url}
          url={item.url}
          onRemoveClick={handleImageRemove}
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
                  name="is_product_status"
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
                  render={({field: { value, onChange}})=>(
                    <PaymentsCheckBox
                      value={value}
                      onChange={onChange}
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
                    onPress={handleSubmit(handleAdCreate)}
                />
            </HStack>

            <Center pb={2} mt={4} flexShrink={0}>
                        <Divider width={40} p={.5} rounded='full'/>
                    </Center>

            
    </ScrollView>
  );
};
