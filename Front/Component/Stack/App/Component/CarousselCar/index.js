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
    ScrollView,
    PanResponder,
    Dimensions
} from 'react-native';

const images = [
  'https://s-media-cache-ak0.pinimg.com/originals/ee/51/39/ee5139157407967591081ee04723259a.png',
  'https://s-media-cache-ak0.pinimg.com/originals/40/4f/83/404f83e93175630e77bc29b3fe727cbe.jpg',
  'https://s-media-cache-ak0.pinimg.com/originals/8d/1a/da/8d1adab145a2d606c85e339873b9bb0e.jpg',
]

export default class CarousselCar extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    item(){
        let { width, height } = Dimensions.get('window')
        return(
            <View style={{width: width, paddingBottom: 30, alignItems: 'center', justifyContent: 'center'}}>
                <View style={style.card}>
                    <Text>Card</Text>
                </View>
            </View>
        )
    }

    render(){
        return(
            <View style={{position: 'absolute'}}>
                <ScrollView
                    centerContent={true}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={10}
                    pagingEnabled
                >
                    {this.item()}
                    {this.item()}
                    {this.item()}
                    {this.item()}
                    {this.item()}
                    {this.item()}
                </ScrollView>
            </View>
        )
    }
}

const style = {
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#445e79',
        height: 200,
        width: 325,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
    }
}
