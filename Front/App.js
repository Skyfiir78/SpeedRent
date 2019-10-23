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

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import StoreCombined from './Redux/configureStore'

const store = createStore(StoreCombined)

import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthStack from './Component/Stack/Auth'
import AppSwitch from './Component/Stack/App'
import LoadingScreen from './Component/Stack/Loading'

const MainNavigation = createAppContainer(createSwitchNavigator({
    Auth: AuthStack,
    App: AppSwitch,
    Loading: LoadingScreen,
},
{
    initialRouteName: 'Loading'
}
))

export default class App extends Component {
    render(){
        return(
            <Provider store={ store }>
                <MainNavigation/>
            </Provider>
        )
    }
}
