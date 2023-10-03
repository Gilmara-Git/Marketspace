/* eslint-disable camelcase */
import { useRef, useState } from 'react'
import { Dimensions, FlatList, ViewToken } from 'react-native'
import { Box, HStack, Image, VStack } from 'native-base'

import { api } from '@services/api'

type ItemsChangedProps = {
  viewableItems: ViewToken[]
  changed: ViewToken[]
}

type ImageSliderProps = {
  productImages: any[]
}

export const ImageSlider = ({ productImages }: ImageSliderProps)=> {
  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ItemsChangedProps) => {
    setImageIndex(info.viewableItems[0].index!)
  })

  // console.log(indexChanged.current, 'linha25', imageIndex)

  const width = Dimensions.get('window').width;

  

  return (
    <VStack>
      <FlatList
        data={productImages}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <Image
            alt="Product image"
            source={{ uri: item.uri }}
            w={width}
            h={width / 1}
            resizeMode="cover"
          />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        onViewableItemsChanged={indexChanged.current}
      />

      <HStack bottom={2} space={2} justifyContent="center">
        {productImages?.map((_, index) => (
          <Box
            key={index}
            bg={imageIndex === index ? 'gray.400' : 'gray.800'}
            rounded="full"
            w={width / 1.07 / productImages.length}
            h={1}
          />
        ))}
      </HStack>
    </VStack>
  )
}
