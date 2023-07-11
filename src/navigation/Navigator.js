import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import MainScreen from '../screens/MainScreen';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import Checkout from '../screens/Checkout';
import MyAddress from '../screens/MyAddress';
import AddAddress from '../screens/AddAddress';
import Orders from '../screens/Orders';
import Success from '../screens/Success';
import AboutUs from '../screens/AboutUs';
import ContactUs from '../screens/ContactUs';
import TermsAndCondition from '../screens/TermsAndCondition';
import ProductDetail from '../screens/ProductDetail';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="MyAddress"
          component={MyAddress}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Success"
          component={Success}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="ContactUs"
          component={ContactUs}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="TermsAndCondition"
          component={TermsAndCondition}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
