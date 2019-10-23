import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    AsyncStorage,
    Button,
} from 'react-native';

export default class SettingsClient extends Component {
    render(){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>SettingsClient</Text>
                <Button
                    title='Logout'
                    onPress={() => {AsyncStorage.removeItem('speedRent:token', () => {
                        this.props.navigation.navigate('Loading')
                    })}}
                />
            </View>
        )
    }
}
