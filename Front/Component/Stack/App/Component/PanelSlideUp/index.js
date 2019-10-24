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
            radius: new Animated.Value(50)
        }
        let { height, width } = Dimensions.get('window')
        this.PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => true,
            onPanResponderMove: (event, gestureState) => {
                let touches = event.nativeEvent.touches;
                if (this.state.topPosition <= 100) {
                    let num = ((100 - 13) / 100) ////// On va le faire ce truc de mettre allerrrrr
                    console.log('calc:' +num);
                    // console.log('topPosition: ', this.state.topPosition);
                }
                if (touches.length == 1) {
                    this.setState({
                        topPosition: touches[0].pageY >= 300 ? ( touches[0].pageY <= 615 ? (touches[0].pageY - height + 380) : (this.state.topPosition)) : (this.state.topPosition)
                    })
                }
            }
        })
    }

    componentDidUpdate(){
        if (this.state.topPosition <= 100 && this.state.radius !== 0) {
            Animated.timing(
              this.state.radius,
              {
                toValue: 0,
                duration: 200, // Le temps est en milliseconds ici (3000ms = 3sec)
                easing: Easing.linear,
              }
            ).start()
        }
        if (this.state.topPosition >= 100 && this.state.radius !== 50) {
            Animated.timing(
                this.state.radius,
                {
                    toValue: 50,
                    duration: 200,
                    easing: Easing.linear
                }
            ).start()
        }
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
