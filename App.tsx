import { StatusBar } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, Karla_400Regular, Karla_700Bold} from '@expo-google-fonts/karla';

import { NativeBaseProvider } from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import { THEME } from '@themes/index';

import { Loading } from '@components/Loading/index';


export default function App() {
  const [fontsLoaded]  = useFonts({
    Karla_400Regular,
    Karla_700Bold
  })

 
  return (
    <SafeAreaProvider>

        <NativeBaseProvider theme={THEME}>
          <StatusBar 
            barStyle='dark-content' 
            backgroundColor='transparent' 
            translucent />

          { !fontsLoaded ? <View><Text  style={{color:'red'}}>Ola</Text></View>
          :
          
          <Loading/>
          // <Text numberOfLines={1}>Open up App.tsx to start working on your now Ola!</Text>
        }
        </NativeBaseProvider>
  
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
