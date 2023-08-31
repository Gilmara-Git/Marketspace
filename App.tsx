import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, Karla_400Regular, Karla_700Bold} from '@expo-google-fonts/karla';

export default function App() {
  const [fontsLoaded]  = useFonts({
    Karla_400Regular,
    Karla_700Bold
  })

 
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      { fontsLoaded ? <View><Text style={{color:'red'}}>Ola</Text></View>
      :
      
      <Text>Open up App.tsx to start working on your Gilmara now Ola!</Text>
    }
    </View>
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
