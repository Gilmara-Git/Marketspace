import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';
import { Home } from '@screens/Home';
import { AdDetails } from "@screens/AdDetails";
import { MyAds} from '@screens/MyAds';
import { MyAdsDetails } from '@screens/MyAdsDetails';
import { AdCreate } from '@screens/AdCreate';
import { AdEdit } from '@screens/AdEdit';
import { AdPreview } from '@screens/AdPreview';
import { SignOutScreen } from '@screens/SignOutScreen'; 

import { Ionicons, Feather } from '@expo/vector-icons';
import { SignOut } from 'phosphor-react-native';
import { ArrowLeft } from 'phosphor-react-native';


type AppRoutesType = {
    home: undefined,
    AdDetails: undefined,
    MyAds: undefined,
    MyAdsDetails: undefined,
    AdCreate: undefined,
    AdEdit: undefined,
    SignOut: undefined,
    AdPreview: {
        title: string,
        description: string, 
        accept_trade: boolean, 
        is_product_new: string, 
        payments: string[], 
        price: string, 
        images: string[]
    },
}


export type AppRoutesNavigationTabProps = BottomTabNavigationProp<AppRoutesType>;
const { Navigator, Screen } = createBottomTabNavigator<AppRoutesType>();



export const AppRoutes = ()=>{
    const { sizes, colors }  = useTheme();
    const iconSize = sizes[1];


    return (
    
    <Navigator screenOptions={{
                headerShown:false,
                tabBarShowLabel:false,
                tabBarActiveTintColor:colors.gray[800],
                tabBarInactiveTintColor: colors.gray[400],
                tabBarStyle:{ 
                    backgroundColor: colors.gray[50],
                    borderTopWidth: 0,
                    paddingTop: iconSize,
                    paddingBottom:iconSize
                                }
            
      
      }}>
        <Screen 
            options={{ 
                tabBarIcon:({color})=>(
                    <Ionicons name='home-outline' size={16} color={color}/>
                ),   
                    
            }}
            name='home' 
            component={Home}
            
            />
        <Screen 
            options={{
                tabBarButton:()=> null,
                tabBarStyle: { display: 'none' },
                // headerLeftLabelVisible: true,
                // headerLeft:()=> <ArrowLeft />,
                // headerStyle: {backgroundColor: '#F7F7F8'},
                // headerTitle: '',
                
           
              
            }}
            name='AdDetails' 
            component={AdDetails}
            />
        <Screen 
            options={{ tabBarIcon:({color})=> <Feather name='tag' size={16} color={color}/>}}
            name='MyAds' 
            component={MyAds}
            />
        <Screen 
           options={{
            tabBarButton:()=> null,
            headerStyle: {backgroundColor: '#F7F7F8'},
            headerTitle: 'My Ads Details',
            headerTitleAlign: 'center',
            headerTitleStyle:{ fontFamily: 'Karla_700Bold', fontWeight: 'bold'},
            headerTintColor: '#1A181B'
        }}
            name='MyAdsDetails' 
            component={MyAdsDetails}
            />
        <Screen 
           options={{
            tabBarButton:()=> null
        }}
            name='AdCreate' 
            component={AdCreate}
            />
        <Screen 
        options={{
            tabBarButton:()=> null
        }}
            name='AdEdit'
            component={AdEdit}
            />
        <Screen 
         options={{
            tabBarButton:()=> null
        }}
            name='AdPreview' 
            component={AdPreview}
            />

            <Screen 
               options={{
                tabBarIcon:()=> <SignOut color='#EE7070' size={16}/>
               }}
                name='SignOut' 
                component={SignOutScreen}/>
    </Navigator>
    )
};
