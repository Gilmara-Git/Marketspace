import { StatusBar } from "react-native";
import {
  useFonts,
  Karla_300Light,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";

import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { THEME } from '@themes/index';

import { Loading } from "@components/Loading/index";
import { Routes } from '@routes/index';
import { AuthContextProvider } from "@src/contexts/AuthContext";


export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
    Karla_300Light
  });

  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={THEME}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />


        <AuthContextProvider >

          {!fontsLoaded ? <Loading spinnerColor='blue.600'/> : <Routes/>}

        </AuthContextProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}

