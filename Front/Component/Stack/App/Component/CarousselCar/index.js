import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    AsyncStorage,
    Animated,
    Easing,
    Button,
    PanResponder,
    Dimensions
} from 'react-native';

export default class CarousselCar extends Component {
    constructor(props) {
      super(props)
      this.state = {}
    }

    render(){
        return(
            <View style={{backgroundColor:'#2c3e50', height: 100}}>
                <Text style={{color: 'black'}}>Caroussel</Text>
            </View>
        )
    }
}
