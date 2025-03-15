import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import LandingScreen from './screens/LandingScreen';
import SplashScreen from './screens/SplashScreen';
import Toast from 'react-native-toast-message';
import BottomTabNavigator from './navigation/BottomTabNavigation';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{
            title: 'Sciqus InfoTech',
            headerStyle: {backgroundColor: '#1E90FF'},
            headerTintColor: '#fff',
            headerTitleStyle: {fontWeight: 'bold'},
          }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerStyle: {backgroundColor: '#1E90FF'},
            headerTintColor: '#fff',
            headerTitleStyle: {fontWeight: 'bold'},
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerStyle: {backgroundColor: '#1E90FF'},
            headerTintColor: '#fff',
            headerTitleStyle: {fontWeight: 'bold'},
          }}
        />
        {/* Replacing HomeScreen with BottomTabNavigator */}
        {/* <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="MainTabs" // ✅ Changed from "Home" to "MainTabs"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
