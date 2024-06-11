/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from './Home'
import Edit from './EditTask'
import Category from './Category';
import Deadline from './Deadline';
import {
  StyleSheet
} from 'react-native';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();




function Hamburger(){
  return (
  
    <Drawer.Navigator initialRouteName='home' screenOptions={{
      headerStyle: {
        backgroundColor: "#1E1A3C"
      },
      drawerStyle:{
        backgroundColor: "#1E1A3C"
      },
      drawerActiveBackgroundColor: "#3E3364",
      drawerActiveTintColor: "white",
      drawerInactiveTintColor: "white",
      headerTintColor: "white",
      
     }}>
      <Drawer.Screen name="home" component={Home} initialParams={{ update: 0, delete: 0 }} options={
        {
          title: "To-Done"
         }
      }/>
      <Drawer.Screen name="high" component={Category} initialParams={{priority: "high"}} options={
        {
          title: "High priority"
         }}  />
      <Drawer.Screen name="medium" component={Category} initialParams={{priority: "medium", due: null}} options={
        {
          title: "Medium priority"
         }}/>
      <Drawer.Screen name="low" component={Category} initialParams={{priority: "low", due: null}} options={
        {
          title: "Low priority"
         }}/>
      <Drawer.Screen name="today" component={Deadline} initialParams={{due: "today", priority: "none"}} options={
        {
          title: "Due today"
         }}/>
      <Drawer.Screen name="tomorrow" component={Deadline} initialParams={{due: "tomorrow", priority: "none"}} options={
        {
          title: "Due tomorrow"
         }}/>
    </Drawer.Navigator>

)

}

function App(): React.JSX.Element {
  
  return (
    <Stack.Navigator>
      
      <Stack.Screen name="hamburger" component={Hamburger} options={{headerShown: false}}/>

      <Stack.Screen name="edit" component={Edit} options={
        {
          headerShown: true,
          title: "",
          headerStyle: {
            backgroundColor: "#1E1A3C"
          },
          headerTintColor: "white"
        }
      } />
      

      
    </Stack.Navigator>
  )
}


function Providers() {

  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Providers;

