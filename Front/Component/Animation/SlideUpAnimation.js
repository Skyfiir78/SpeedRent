import React, { Component } from 'react';
import { PanResponder, Dimensions, View } from 'react-native'


export default class SlideUpAnimation extends Component {
    constructor(props){
        super(props)
        this.state = {
            topPosition: 0,
        }
        let { height, width } = Dimensions.get('window')
        this.PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => true,
            onPanResponderMove: (event, gestureState) => {
                let touches = event.nativeEvent.touches;
                    console.log(touches[0]);
                if (touches.length == 1) {
                    this.setState({
                        topPosition: touches[0].pageY - height
                    })
                }
            }
        })
    }

    render(){
        return(
            <View {...this.PanResponder.panHandlers} style={{top: this.state.topPosition}}>
                {this.props.children}
            </View>
        )
    }
}
