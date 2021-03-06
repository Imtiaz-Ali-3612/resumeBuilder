

import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { connect } from 'react-redux';
import SignInScreen from './src/authScreens/SignInScreen';
import SignUpScreen from './src/authScreens/SignUpScreen';
import SettingsScreen from './src/HomeScreens/SettingsScreen'

import SplashScreen from './src/config/SplashScreen';
import {  getUserToken } from './src/Redux/actions/actions';
import ResumeStack from './src/NavigationStacks/Drawer';
// import {useSelector} from 'react-redux';
const Stack = createStackNavigator();
const Tab=createBottomTabNavigator();

 class App extends Component {
   render(){
     console.log('---- In app ---- ')
    if (this.props.token.loading) {
      // console.log(this.props);
      this.props.getUser()
      return <SplashScreen />;
    }
  return (
    <NavigationContainer>
    { console.log('================') }
      
      {!this.props.token.token ? (
       <Stack.Navigator initialRouteName="SignIn">
         <Stack.Screen name="SignIn" component={SignInScreen}
         options={{
          title: ' Sign In',
          headerStyle: {
            backgroundColor: '#f7f3ff',
            },
          
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
         />
          <Stack.Screen name="SignUp" component={SignUpScreen} />      
       </Stack.Navigator>
      ):(
          <Tab.Navigator>
          <Tab.Screen name="Home" component={ResumeStack}
          options={{
            title: 'Home',
            headerTitleStyle: {
              fontWeight: 'bold',
              // textAlign:'center'
            },
            tabBarIcon:()=>(       <Icon name="home" size={25}  color="#5DADE2" />)
          }}
  
          ></Tab.Screen>
          <Tab.Screen name="Settings" component={SettingsScreen}
          options={{
            title: 'Settings',
            headerTitleStyle: {
              fontWeight: 'bold',
              // textAlign:'center'
            },
            tabBarIcon:()=>(       <Icon name="cog" size={25}  color="#5DADE2" />)
          }}
          
          ></Tab.Screen>
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
    }
};

const mapStateToProps = state => ({
  token: state.token
});


const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(getUserToken())
});

export default connect(mapStateToProps,mapDispatchToProps)(App);