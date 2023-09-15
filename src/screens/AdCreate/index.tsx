import { useState } from "react";
import { LogBox, Alert } from "react-native";
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
  Skeleton
} from "native-base";
import SelectMultiple from "react-native-select-multiple";
import * as ImagePicker from 'expo-image-picker';

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "@components/Input";
import { TextBox } from "@components/TextBox";
import { Button } from '@components/Button';
import { ButtonsRadio } from "@components/ButtonsRadio";
import { ProductImage } from "@src/components/ProductImage";
import { Plus } from "phosphor-react-native";

import * as FileSystem from 'expo-file-system';

const AdCreateSchema = yup.object().shape({
  title: yup.string().required("Type a title for your product."),
  description: yup.string().required('Please describe your product.'),
  product_status: yup.string().required("Please select if product is new or used."),
  accept_trade: yup.boolean().required().default(false),
  payments: yup.array(yup.object().required('Choose at least one payment type').required('one')),
  price: yup.string().required('Please type your product price'),
  // price: yup.string().test('is-number', 'Invalid price', (value)=>{
    
    
  //   if(typeof value !== 'undefined'){
  //     const parsedNumber = parseFloat(value);
  //     if(!isNaN(parsedNumber)){
  //       return true
  //     }


  //     return false
  //   }

  // }).required("Please type your product value."),
});

type FormData = yup.InferType<typeof AdCreateSchema>;

type ImagesType = {
  url: string
}[];

export const AdCreate = () => {
  // these 3 state and handlePaymentsSelected copied from Modal
  const [paymentMethods, setPaymentMethods] = useState<string[]>([
    "Bill",
    "Zelle",
    "Cash",
    "Credit card",
    "Deposit",
  ]);
  const [acceptsTrade, setIsAcceptsTrade] = useState(false);
  const [paymentsSelected, setPaymentsSelected] = useState<string[]>([]);
  const [ images, setImages ] = useState<ImagesType>(); 
  const [ imageLoading, setImageLoading ] = useState(true)


  const handleImageRemove = (url: string)=>{
    const currentImages = images;
    const filteredImages = currentImages?.filter(images => images.url !== url);
    setImages(filteredImages);
   
  };

  const {
    control, handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(AdCreateSchema),
  });
console.log('me da os error', errors)
  LogBox.ignoreLogs([
    "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
  ]);

  const handleAdCreate = (data : object) =>{
    console.log(data, 'line64')
  };

  // const handlePaymentsSelected = (selections: any, item: any) => {
  //   if (!paymentsSelected.includes(item.value)) {
  //     setPaymentsSelected((prev) => [item.value, ...prev]);
  //   } else {
  //     let current = paymentsSelected;
  //     // it did not take filter, I had to find the index and apply splice
  //     const index = current.indexOf(item.label);
  //     current.splice(index, 1);
  //     setPaymentsSelected([...current]);
  //   }
  // };


  const handlePickedImages = async ()=>{

    try{
   
      
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
      setImageLoading(true);
         
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
              
              if(file.exists && (file.size /1024/1024) > 3){
                return Alert.alert('One of more images are too Big')
              }
              
              if(!validatedImages.includes({ url: image.url } )){
                validatedImages.push( { url: image.url})

              }
            
            }
            
              setImages(validatedImages);
     

    }
    catch(error){
      console.log(error);
      throw error;

    }finally{
      setImageLoading(false);
    }
    

  };
    
    //passed isPressed={true} manually for now
  return (
    <ScrollView>
      <VStack bg="gray.200" px={6} pt={6} flex={1} pb={4}>
        <Heading fontFamily="heading" fontSize="md" pb={2}>
          Images
        </Heading>
        <Text pb={4} numberOfLines={2} fontFamily="body" fontSize="sm">
          Choose up to 3 images to show your incredible product!
        </Text>
        <HStack pb={8}>

     
          { (images?.length === undefined || images.length <=2) &&
          
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

      { images?.map(item=>(

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
              name="title"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Product Title"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.title?.message}
                  isInvalid={!!errors.title}
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
              name="product_status"
              control={control}
              render={({ field: { value, onChange } }) => (
                <ButtonsRadio
                  accessibilityLabel="product status"
                  name="product_status"
                  onChange={onChange}
                  value={value}
                  errorMessage={errors.product_status?.message}
                  isInvalid={!!errors.product_status}
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
                  placeholder="Product value"
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
                name='payments'
                control={control}
                render={({field: { value, onChange}})=>(
                  <SelectMultiple
                    style={{ showsVerticalScrollIndicator: "false" }}
                    checkboxStyle={{
                      backgroundColor: "#d2daf5",
                      width: 18,
                      height: 18,
                    }}
                    labelStyle={{ color: "#3E3A40", padding: 5 }}
                    items={paymentMethods}
                    selectedItems={value}
                    onSelectionsChange={onChange}
                    errorMessage={errors.payments?.message}
                    
                  />

                )}
              />
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
                    onPress={()=>console.log('Cancel')}
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
