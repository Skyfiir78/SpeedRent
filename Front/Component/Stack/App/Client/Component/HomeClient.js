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

import PanelSlideUp from '../../Component/PanelSlideUp'
import SlideUpAnimation from '../../../../Animation/SlideUpAnimation'

export default class HomeClient extends Component {
    constructor(props) {
      super(props)
      this.state = {}
    }

    render(){
        return(
            <View style={{flex: 1, alignItems: 'center', backgroundColor:'#2c3e50'}}>
                    <View style={{flex: 1, justifyContent: 'flex-end', width: '100%'}}>
                        <PanelSlideUp />
                    </View>
            </View>
        )
    }
}
