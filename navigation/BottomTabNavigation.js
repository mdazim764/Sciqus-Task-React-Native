import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import GalleryScreen from '../screens/GalleryScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Sidebar
import Sidebar from '../component/Sidebar';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  // Controls whether the sidebar is collapsed (true) or expanded (false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  return (
    <View style={styles.container}>
      {/* Sidebar always visible on the left, pass setSidebarCollapsed */}
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* SHIFT the main content by marginLeft */}
      <View
        style={[styles.tabContainer, {marginLeft: sidebarCollapsed ? 55 : 55}]}>
        <Tab.Navigator
          initialRouteName="Home" // Home is open by default
          screenOptions={({route}) => ({
            tabBarStyle: {
              backgroundColor: '#439cf0',
              height: 60,
              paddingBottom: 10,
            },
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: 'bold',
              color: 'white',
            },
            headerShown: false,
            tabBarIcon: ({color, size, focused}) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Gallery') {
                iconName = focused ? 'images' : 'images-outline';
              } else if (route.name === 'Notifications') {
                iconName = focused ? 'notifications' : 'notifications-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: '#d1b3ff',
          })}>
          {/* Normal tab for Profile => leads to ProfileScreen */}

          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Gallery" component={GalleryScreen} />
          <Tab.Screen name="Notifications" component={NotificationsScreen} />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{tabBarLabel: 'Profile'}}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flex: 1,
    backgroundColor: '#2348fc',
  },
});
