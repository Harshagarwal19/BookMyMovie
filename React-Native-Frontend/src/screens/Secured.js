import React, { Component } from 'react';
import {
	ScrollView,
	Text,
	View,
    AppRegistry,
	Button,
	Navigator
} from 'react-native';
import Confirmation from '../Confirmation';
import Movies from '../Movies';
import { StackNavigator } from "react-navigation";
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
const RouteMapper = (route, navigator) => {
	if (route.name === 'movies') {
	  return (
		<Movies navigator={navigator} />
	  );
	} else if (route.name === 'confirmation') {
	  return (
		<Confirmation code={route.code} navigator={navigator} />
	  );
	}
  };
class Secured extends Component {

	// onLogoutPress = () => {
    //     console.log(this.props);
    //     this.props.navigation.navigate('Login');
    // }
	// render() {
	// 	// return (
	// 	// 	<ScrollView style={{padding: 20}}>
	// 	// 		<Text 
	// 	// 			style={{fontSize: 27}}>
	// 	// 			Welcome
	// 	// 		</Text>
	// 	// 		<View style={{margin:20}} />
	// 	// 		<Button
	// 	//             onPress={this.onLogoutPress}
	// 	//             title="Logout"
	// 	//         />
	// 	//     </ScrollView>
    //     // )
	// }
	render() {
		return (
			<Movies />

		);
	  }
}

// AppRegistry.registerComponent('Secured', () => Secured);

export default Secured;




// import React, { Component } from 'react';
// import {
//   Navigator,
// } from 'react-native';
// import Movies from './Movies';

// const RouteMapper = (route, navigator) => {
//   if (route.name === 'movies') {
//     return <Movies navigator={navigator} />;
//   }
// };

// export default class App extends Component {
//   render() {
//     return (
//       <Navigator
//         // Default to movies route
//         initialRoute={{ name: 'movies' }}
//         // Use FloatFromBottom transition between screens
//         configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
//         // Pass a route mapper functions
//         renderScene={RouteMapper}
//       />
//     );
//   }
// }
