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

import FadeIn from '../../../../Animation/FadeIn'

export default class HomeClient extends Component {
    constructor(props) {
      super(props)
      this.state = {
        topPosition: new Animated.Value(300),
        leftPosition: 0,
      }
    }

    render(){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#2c3e50'}}>
                <FadeIn>
                    <Text>HomeClient</Text>
                </FadeIn>
            </View>
        )
    }
}
