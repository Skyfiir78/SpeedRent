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
            topPosition: 326,
            radius: new Animated.Value(80)
        }
        let { height, width } = Dimensions.get('window')
        this.PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => true,
            onPanResponderMove: (event, gestureState) => {
                let touches = event.nativeEvent.touches;
                if (touches.length == 1) {
                    this.setState({
                        topPosition: touches[0].pageY >= 300 ? ( touches[0].pageY <= 615 ? (touches[0].pageY - height + 380) : (this.state.topPosition)) : (this.state.topPosition),
                        radius: this.state.topPosition <= 240 ? (this.state.topPosition / 3):(80) //240 = inital radius * 3 I DON'T NO WHY...
                    })
                }
            }
        })
    }

    render(){
        return(
            <Animated.View {...this.PanResponder.panHandlers} style={[style.view, {top: this.state.topPosition, borderTopRightRadius: this.state.radius, borderTopLeftRadius: this.state.radius}]}>
                <Text>PanelSlideUp</Text>
            </Animated.View>
        )
    }
}

const style = {
    view: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#445e79',
        width: '100%',
        height: 380,
    }
}
