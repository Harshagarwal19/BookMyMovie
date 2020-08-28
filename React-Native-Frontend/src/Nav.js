import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

// Navigators
import { TabNavigator } from 'react-navigation'

// TabNavigator screens
import Movies from './Movies'
import Upload from './Upload'
// import TabC from './TabC'



export const Tabs = TabNavigator({
    Movies: { screen: Movies },
    Upload: { screen: Upload },
}, {
  order: ['Movies', 'Upload']
})
