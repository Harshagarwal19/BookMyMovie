import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './src/screens/LogIn';
import Register from './src/screens/Register';
import Secured from './src/screens/Secured';
import Confirmation from './src/Confirmation';
import Movies from './src/Movies';
import Upload from './src/Upload';
import ShowBooking from './src/show_booking';

const MainNavigator = createStackNavigator({
  Login: {screen: Login,navigationOptions:  {
    header: null,
  }},
  ShowBooking: {screen: ShowBooking,navigationOptions:  {
    header: null,
  }},
  Register: {screen: Register,navigationOptions:  {
    header: null,
  }},
  Secured: {screen: Secured,navigationOptions:  {
    title: 'Secured',
    headerLeft: null
  }},
  Upload: {screen: Upload},
    Confirmation: {screen: Confirmation,navigationOptions:  {
      title: 'Confirmation',
      headerLeft: null
    }},
    Movies: {screen: Movies,},
  },
  {
  	initialRouteName: "Login"
  }
);

const App = createAppContainer(MainNavigator);

export default App;
 
AppRegistry.registerComponent('awesome', () => App);