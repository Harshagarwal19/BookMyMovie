import React, { Component } from 'react';
import {PropTypes} from 'prop-types';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { defaultStyles } from './styles';

export default class Confirmation extends Component {

  static propTypes = {
    code: PropTypes.string.isRequired,
  }
  doConfirm = (params1) => {

    // const { params1 } = this.props.navigation.state;
    console.log("Hi there");
    const movie = params1.movie;
    console.log(params1);
    console.log(movie);
    var params = {
        email: global.email,
        movie: movie.title,
        day:movie.days[params1.day],
        time:movie.times[params1.time],
        code:params1.code,
    };
    console.log(params);
    var formBody = [];
    for (var property in params) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(params[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    var proceed = false;
    fetch("http://172.17.75.230:5000/api/users/register_movie", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
        .then((response) => response.json())
        .then((response) => {

            if (response.success==true) 
            {    proceed = true;
              this.props.navigation.navigate('Movies');
                console.log("SUCCESS");
            } 
            else this.setState({ message: response.message });
        })
        .then(() => {
        })
        .catch(err => {
    this.setState({ message: err.message });
    this.setState({ isLoggingIn: false })
  });
    //   <Confirmation code={Math.random().toString(36).substring(6).toUpperCase()} />;
    }
  
  render() {
    const { params } = this.props.navigation.state;
    console.log(params);
    console.log("###############");
    const code = params ? params.code : null;
    // params["time"] = 
    console.log(params);
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Your confirmation code</Text>
        <Text style={styles.code}>{code}</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          // Go back when pressed
          onPress={this.doConfirm(params)}
        >
          <Text style={styles.button}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    ...defaultStyles.text,
    color: '#333',
    fontSize: 20,
  },
  code: {
    ...defaultStyles.text,
    color: '#333',
    fontSize: 36,
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#673AB7',
    borderRadius: 100,
    margin: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  button: {
    ...defaultStyles.text,
    color: '#FFFFFF',
    fontSize: 18,
  },
});