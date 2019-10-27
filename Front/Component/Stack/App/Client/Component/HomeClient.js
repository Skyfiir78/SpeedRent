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
import CarousselCar from '../../Component/CarousselCar'
import SlideUpAnimation from '../../../../Animation/SlideUpAnimation'

export default class HomeClient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            opacity: new Animated.Value(1)
        }
    }

    render(){
        return(
            <>
                <Animated.View style={{flex: 1, alignItems: 'center', backgroundColor:'#2c3e50', opacity: this.state.opacity}}>
                    <View style={{flex: 1, justifyContent: 'flex-start', width: '50%', height: 300}}>
                        <CarousselCar topPosition={50} />
                    </View>
                </Animated.View>
                <View style={{flex: 1, position: 'absolute',justifyContent: 'flex-end', width: '100%'}}>
                    <PanelSlideUp
                        topPosition={330}
                        height={500}
                        initMarginTopSlider={40}
                        radiusClose={200}
                        radiusOpen={50}
                        rangeSlider = {(value) => this.setState({opacity: value})}
                    />
                </View>
            </>
        )
    }
}
