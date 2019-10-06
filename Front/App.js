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

import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthStack from './Component/Stack/Auth'
import AppSwitch from './Component/Stack/App'

const MainNavigation = createAppContainer(createSwitchNavigator({
    Auth: AuthStack,
    App: AppSwitch
},
{
    initialRouteName: 'Auth'
}
))

export default class App extends Component {
    render(){
        return(<MainNavigation/>)
    }
}
