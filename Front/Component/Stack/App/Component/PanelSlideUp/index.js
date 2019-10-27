import React, { Component } from 'react';
import {
    PanResponder,
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    AsyncStorage,
    Dimensions,
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native';

export default class PanelSlideUp extends Component {
    constructor(props){
        super(props)
        let { height, width } = Dimensions.get('window')
        this.MinTopPosition = height - (this.props.topPosition / 2) + this.props.initMarginTopSlider
        this.MaxTopPosition = this.props.height - this.props.topPosition
        this.state = {
            topPosition: new Animated.Value(this.MinTopPosition),
            flecheRotation: new Animated.Value(0),
        }
        this.style = {
           SliderView: {
               backgroundColor: '#445e79',
               width: '100%',
               height: this.props.height,
               top: this.state.topPosition,
               borderTopRightRadius: this._getRadiusAngle(),
               borderTopLeftRadius: this._getRadiusAngle(),
               shadowColor: '#000',
               shadowOffset: { width: 0, height: 2 },
               shadowOpacity: 0.8,
               shadowRadius: this._getRadiusAngle(),
           }
       }
        this.PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => true,
            onPanResponderMove: (event, gestureState) => {
                let touches = event.nativeEvent.touches;
                if (touches.length == 1){
                    this.state.topPosition.setValue(touches[0].pageY >= this.MaxTopPosition ? (touches[0].pageY) : (this.state.topPosition._value))
                    this.props.rangeSlider(this.state.topPosition.interpolate({
                        inputRange: [this.MaxTopPosition, this.MinTopPosition],
                        outputRange: [0, 1],
                        extrapolate: 'clamp'
                    }))
                }
            },
            onPanResponderRelease: (event, gestureState) => {
                if (this.state.topPosition._value >= this.MaxTopPosition * 2) {
                    this._closePanel()
                }else {
                    this._openPanel()
                }
            },
        })
    }

    _openPanel = () => {
        return Animated.spring(this.state.topPosition, {
          toValue: this.MaxTopPosition,
          friction: 5
        }).start();
    }

    _closePanel = () => {
        return Animated.spring(this.state.topPosition, {
          toValue: this.MinTopPosition,
          friction: 5
        }).start();
    }

    _getRadiusAngle = () => {
        const radiusInterpolatedValue = this.state.topPosition.interpolate({
            inputRange: [this.MaxTopPosition, this.MinTopPosition],
            outputRange: [this.props.radiusOpen, this.props.radiusClose],
        })
        return radiusInterpolatedValue
    }

    _getFlecheRotation = () => {
        let flecheRotationInterpolatedValue = this.state.topPosition.interpolate({
            inputRange: [this.MaxTopPosition, this.MinTopPosition],
            outputRange: ['180deg', '0deg'],
        })
        return flecheRotationInterpolatedValue
    }

    render(){
        return(
            <Animated.View {...this.PanResponder.panHandlers} style={this.style.SliderView}>
                    <Animated.View style={{flex: 0, alignItems: 'center', marginTop: 10, color: '#2c3e50', transform: [{ rotate: this._getFlecheRotation()}]}}>
                        <Text style={{fontSize: 25, color: '#2c3e50'}}>&#9650;</Text>
                    </Animated.View>
                    {this.props.children}
            </Animated.View>
        )
    }
}
