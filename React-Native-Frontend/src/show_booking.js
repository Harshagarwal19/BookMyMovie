import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  DropdownButton,
  Image,
  TouchableOpacity,
  Alert, ActivityIndicator,List, ListItem,FlatList,SafeAreaView,TouchableHighlight,
} from 'react-native';
// import Constants from 'expo-constants';
var DOMParser = require('xmldom').DOMParser;


const parseText = (html) => {
  var parser = new DOMParser();
  var htmlDoc = parser.parseFromString(html, 'text/xml');
  var list = htmlDoc.getElementsByTagName('p');
  return list;
}
function Item({ title }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title.movie}</Text>
        <Text style={styles.title1}>{title.code}    -   {title.day}   -   {title.time}</Text>
      </View>
    );
  }
export default class Movies extends Component {
    constructor(props){
        super(props);
        this.state = {isLoading: true,dataSource:[]}
      }


    async componentWillMount(){
        try {
            var params = {
                email: global.email,
                // password: this.state.password
            };
            var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
          const response = await fetch("http://172.17.75.230:5000/api/users/get_booking", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:formBody,
          });
          const responseJson = await response.json();
          console.log(responseJson);
          var list = responseJson;
        //   var list = parseText(responseJson.text_out);
        //   var data = [];
        //   Array.from(list).forEach((child) => data.push(child.firstChild.data));
        //   this.setState({
        //     isLoading: false,
        //     dataSource: data,
        //   }, function () {
        //   });
        //   console.log("DATA");
        //   console.log(data);
        this.setState({
            dataSource: list,
            isLoading: false,
          }, function(){
    
          });
          console.log(list);

        }
        catch (error) {
          console.error(error);
        }
      }

      _toMovies = () => {
        console.log(this.props);
        this.props.navigation.navigate('Movies');
    }
    render(){
        if(this.state.isLoading){
            return(
              <View style={{flex:1, padding: 20}}>
                <ActivityIndicator />
              </View>
            )
          }
        if(this.state.dataSource.length==0)
        return(
            <View style={styles.container}>
                <Text style={{justifyContent:'center'}}>No Bookings</Text>
            </View>
        )
        return(
        <SafeAreaView style={styles.container}>
            <FlatList
              data={this.state.dataSource}
              renderItem={({ item }) => <Item title={item} />}
            />
            {/* <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this._toMovies}>
            <Text style={styles.loginText}>Movies</Text>
          </TouchableHighlight> */}
          </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,

      alignItems: 'center',
    //   marginTop: Constants.statusBarHeight,
    },
    item: {
      backgroundColor: '#82f1f9',
      padding: 10,
      marginVertical: 2,
      marginHorizontal: 3,
    },
    title: {
      fontSize: 25,
    },
    title1: {
      fontSize: 18,
    },
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

      alignItems: 'center',
      },
      loginText: {
        color: 'white',

      alignItems: 'center',
      },
  });