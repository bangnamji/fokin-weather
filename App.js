import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Alert} from 'react-native';
import Loading from "./Loading";
import * as Location from 'expo-location';
import axios from 'axios';

const API_KEY = '0a13ed05a53a440f9b7e9be2c10cdaed';

//location 제대로 작동되는 확인해보자
export default class extends React.Component {
  state= {
    isLoading: true
  };
  getWeather = async(latitude, longitude) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
      );
      //백틱으로 해야 함 ! 1 옆에 있는거 ~~
      console.log(data);
  };
  getLocation = async() => {
    try {
      await Location.requestPermissionsAsync();
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
      //console.log(coords.latitude, coords.latitude);
      this.setState({isLoading: false});
      //API로 전송해서 날씨 가져올거야 ~
    } catch (error) {
      Alert.alert("Can't find you.", "So sad")
    }
  };
  componentDidMount(){
    this.getLocation();
  }
  render() {
    const {isLoading} = this.state;
    return isLoading? <Loading />: null;
    }
}


// export default function App() {
//   return <Loading/>;
//   // return (
//   //   <View style={styles.container}>
//   //     <View style={styles.yellowView}>
//   //     </View>
//   //     <View style={styles.blueView}>
//   //     </View>
//   //   </View>
//   // );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     //flexDirection:'row'로 바꾸는건 내 자유 -> 정렬(세로or가로)
//     justifyContent: 'center',
//   },
//   yellowView: {
//     flex: 1,
//     backgroundColor: 'yellow'
//   },
//   blueView: {
//     flex: 1,
//     backgroundColor: 'blue'
//   }
// });
