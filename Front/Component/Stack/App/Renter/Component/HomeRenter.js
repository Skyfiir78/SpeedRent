import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    AsyncStorage,
} from 'react-native';

export default class HomeRenter extends Component {
    render(){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>HomeRenter</Text>
            </View>
        )
    }
}
