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
import HomeMap from '../../Component/Map/HomeMap'

const cars = [{name: 'cars1'}, {name: 'cars2'}, {name: 'cars3'}, {name: 'cars4'}]


export default class HomeClient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            opacity: new Animated.Value(1),
            indexCar: 0,
        }
    }

    render(){
        return(
            <>
                <Animated.View style={{flex: 1, alignItems: 'center', backgroundColor:'#2c3e50', opacity: this.state.opacity}}>
                    <HomeMap />
                    <CarousselCar
                        onCarChange={(index) => this.setState({indexCar: index})}
                        cars={cars}
                    />
                </Animated.View>
                    <PanelSlideUp
                        topPosition={330}
                        height={500}
                        initMarginTopSlider={40}
                        radiusClose={200}
                        radiusOpen={50}
                        rangeSlider = {(value) => this.setState({opacity: value})}
                    />
            </>
        )
    }
}
