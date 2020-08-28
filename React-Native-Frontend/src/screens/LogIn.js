import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button,
    Alert,
    AppRegistry,
    ActivityIndicator,
    Stylesheet,
    StyleSheet,
    TouchableOpacity,
    Image,
    TouchableHighlight,
} from 'react-native';
import ShowBooking from "../show_booking";
import { StackNavigator } from "react-navigation";
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// import Environment from './../Environment';
import Register from './Register';

class Login extends Component {
    constructor(){
 
        super();
     
        // Creating Global Variable.
        global.photourl = "";
        global.email = "";
        global.id = 0;
     
      }
    state = {
        email: '',
        password: '',
        isLoggingIn: false,
        message: ''
    }

    _userLogin = () => {
    // componentWillMount{
        this.setState({ isLoggingIn: true, message: '' });

        var params = {
            email: this.state.email,
            password: this.state.password
        };

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        var proceed = false;
        fetch("http://172.17.75.230:5000/api/users/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                if (response.success==true) 
                {    proceed = true;
                    global.photourl = response.photo;
                    global.id = response.id;
                    global.email = response.email;
                    console.log("SUCCESS");
                } 
                else this.setState({ message: response.message });
            })
            .then(() => {
                this.setState({ isLoggingIn: false })
                if(proceed) this.goToSecured();
            })
            .catch(err => {
				this.setState({ message: err.message });
				this.setState({ isLoggingIn: false });
			});
    }

    clearEmail = () => {
        this._email.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }

    clearPassword = () => {
        this._password.setNativeProps({ text: '' });
        this.setState({ message: '' });
    }

    onPressRegister = () => {
        console.log(this.props);
        this.props.navigation.navigate('Register');
    }
    goToSecured = () => {
        console.log(this.props);
        this.props.navigation.navigate('Movies');
    }

    render() {
        
        return (



        //     <ScrollView style={{padding: 20}}>
		// 		<Text 
		// 			style={{fontSize: 27}}>
		// 			Login
		// 		</Text>

		// 		<TextInput
		// 			ref={component => this._email = component}
		// 			placeholder='Email' 
		// 			onChangeText={(email) => this.setState({email})}
		// 			autoFocus={true}
		// 			onFocus={this.clearEmail}
		// 		/>
		// 		<TextInput 
		// 			ref={component => this._password = component}
		// 			placeholder='Password' 
		// 			onChangeText={(password) => this.setState({password})}
		// 			secureTextEntry={true}
		// 			onFocus={this.clearPassword}
		// 			onSubmitEditing={this._userLogin}
		// 		/>
		// 		{!!this.state.message && (
		// 			<Text
		// 				style={{fontSize: 14, color: 'red', padding: 5}}>
		// 				{this.state.message}
		// 			</Text>
		// 		)}
		// 		{this.state.isLoggingIn && <ActivityIndicator />}
		// 		<View style={{margin:7}} />
		// 		<Button 
		// 			disabled={this.state.isLoggingIn||!this.state.email||!this.state.password}
		//       		onPress={this._userLogin}
		//       		title="Submit"
		//       	/>

        //         <Button
        //             title="Register"
        //             onPress={this.onPressRegister}
        //           />

	    //   </ScrollView>
          <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/email/ultraviolet/50/3498db'}}/>
            <TextInput style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.setState({email})}/>
          </View>
          
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
            <TextInput style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onSubmitEditing={this._userLogin}
                onChangeText={(password) => this.setState({password})}/>
                
          </View>
          {!!this.state.message && (
					<Text
						style={{fontSize: 14, color: 'red', padding: 5}}>
						{this.state.message}
					</Text>
				)}
				{this.state.isLoggingIn && <ActivityIndicator />}
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this._userLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonContainer} onPress={this.onPressRegister}>
              <Text>Register</Text>
          </TouchableHighlight>
        </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
      width:30,
      height:30,
      marginLeft:15,
      justifyContent: 'center'
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
    },
    loginButton: {
      backgroundColor: "#00b5ec",
    },
    loginText: {
      color: 'white',
    }
  });
export default Login;