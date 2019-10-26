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
        this.state = {
            topPosition: new Animated.Value(326),
            radius: new Animated.Value(200),
            flecheRotation: new Animated.Value(0),
            open: false,
        }
        let { height, width } = Dimensions.get('window')
        this.PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => true,
            onPanResponderMove: (event, gestureState) => {
                let touches = event.nativeEvent.touches;
                if (touches.length == 1) {
                    this.state.topPosition.setValue(touches[0].pageY >= 300 ? ( touches[0].pageY <= 615 ? (touches[0].pageY - height + 380) : (326)) : (0))
                }
            },
            onPanResponderRelease: (event, gestureState) => {
                if (this.state.topPosition._value <= 200) {
                    this._openPanel()
                }else {
                    this._closePanel()
                }
            },
        })
    }

    _openPanel = () => {
        return Animated.timing(this.state.topPosition, {
          toValue: 0,
          easing: Easing.linear,
          duration: 250,
        }).start();
    }

    _closePanel = () => {
        return Animated.timing(this.state.topPosition, {
          toValue: 326,
          easing: Easing.elastic(2),
          duration: 500,
        }).start();
    }

    _getRadiusAngle = () => {
        const radiusInterpolatedValue = this.state.topPosition.interpolate({
            inputRange: [0, 200],
            outputRange: [100, 200],
            useNativeDriver: true
        })
        return radiusInterpolatedValue
    }

    _getFlecheRotation = () => {
        let flecheRotationInterpolatedValue = this.state.topPosition.interpolate({
            inputRange: [0, 326],
            outputRange: ['180deg', '0deg'],
        })
        return flecheRotationInterpolatedValue
    }

    render(){
        return(
            <Animated.View {...this.PanResponder.panHandlers} style={[style.view, {top: this.state.topPosition, borderTopRightRadius: this._getRadiusAngle(), borderTopLeftRadius: this._getRadiusAngle()}]}>
            <TouchableOpacity onPress={() => this._openPanel()}>
                <Animated.View style={{flex: 0, alignItems: 'center', marginTop: 10, color: '#2c3e50', transform: [{ rotate: this._getFlecheRotation()}]}}>
                    <Text style={{fontSize: 25, color: '#2c3e50'}}>&#9650;</Text>
                </Animated.View>
                {this.props.children}
            </TouchableOpacity>
            </Animated.View>
        )
    }
}

const style = {
    view: {
        backgroundColor: '#445e79',
        width: '100%',
        height: 380,
    }
}
