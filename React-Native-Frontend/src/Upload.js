import React from 'react';
import { View, Text, Image, Button,TouchableHighlight,StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { StackNavigator } from "react-navigation";
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// import console = require('console');
// import ImagePicker from 'react-native-image-picker/lib/commonjs';
export default class Upload extends React.Component {
  state = {
    photo: {uri:global.photourl},
  };
  static navigationOptions = ({ navigation }) => {
    return {
    headerTitle: "Profile",

    headerLeft: null,
    };
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response });
        
        console.log(response.uri);
      }
    });
  };
  _toBooking = () => {
    console.log(this.props);
    this.props.navigation.navigate('ShowBooking');
}
_doLogout = () => {
  console.log(this.props);
  this.props.navigation.navigate('Login');
}
  render() {
    const { photo } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{flex:0.2}}>Email: {global.email}</Text>

        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 150, height: 150 }}
          />
        )}
        {/* <Button title="Choose Photo" onPress={this.handleChoosePhoto} /> */}
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this._toBooking}>
            <Text style={styles.loginText}>Bookings</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonContainer} onPress={this._doLogout}>
              <Text>Logout</Text>
          </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
buttonContainer: {
  height:45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:20,
  width:250,
  borderRadius:30,

alignItems: 'center',
},
loginButton: {
  backgroundColor: "#00b5ec",

  justifyContent: 'center',
alignItems: 'center',
},
loginText: {
  color: 'white',

  justifyContent: 'center',
alignItems: 'center',
},
});