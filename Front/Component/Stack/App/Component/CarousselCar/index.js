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

export default class CarousselCar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            indexCar: 0,
            xPosition: new Animated.Value(0)
        }
    }

    scrollChange = async () => {
        let { width, height } = Dimensions.get('window')
        let xPosition = this.state.xPosition._value
        for (var i = 0; i < this.props.cars.length; i++) {
            if (width * i === xPosition) {
                await this.props.onCarChange(i)
                await this.setState({indexCar: i})
                return
            }
        }
    }

    item(car, key){
        let { width, height } = Dimensions.get('window')
        return(
            <View key={key} style={{width: width, alignItems: 'center', justifyContent: 'center'}}>
                <View style={style.card}>
                    <View style={style.subCard}>
                        <Text>{car.name}</Text>
                    </View>
                </View>
                    <View style={style.imageCard}>
                        <Image
                            style={{width: '95%', height: '90%', borderRadius: 10}}
                            source={{uri: 'https://cdn.bmwblog.com/wp-content/uploads/2018/11/arctic-silver-metallic-bmw-e36-m3-lightweight-aftermarket-forgestar-wheels-b-830x553.jpg'}}
                        />
                    </View>
            </View>
        )
    }

    render(){
        return(
            <View style={{position: 'absolute', top: 20}}>
                <ScrollView
                    onScroll={(event) => this.state.xPosition.setValue(event.nativeEvent.contentOffset.x)}
                    onMomentumScrollEnd={this.scrollChange}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={10}
                    pagingEnabled
                >
                    {
                        this.props.cars.map((item, index) =>
                            this.item(item, index)
                        )
                    }
                </ScrollView>
            </View>
        )
    }
}

const style = {
    imageCard:{
        position: 'absolute',
        bottom: 125,
        width: 200,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#445e79',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
        	width: 0,
        	height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    card: {
        marginTop: 70,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#445e79',
        height: 140,
        width: 325,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
        	width: 0,
        	height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,

        elevation: 18,
    },
    subCard:{
        paddingTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#ecf0f1',
        height: 120,
        width: 300,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
        	width: 0,
        	height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    }
}
