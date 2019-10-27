import React from 'react'

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/FontAwesome';

import HomeClient from './Component/HomeClient'
import SettingsClient from './Component/SettingsClient'

const HomeStack = createAppContainer(createStackNavigator({
    init: {
        screen: HomeClient,
        navigationOptions: {
            title: 'HOME',
            header: null
        }
    },
},
{
    initialRouteName: 'init',
}))

const SettingsStack = createAppContainer(createStackNavigator({
    init: SettingsClient
},
{
    initialRouteName: 'init'
}))

const ClientStack = createAppContainer(createMaterialBottomTabNavigator({
    homeClient: {
        screen: HomeStack,
        navigationOptions: {
            tabBarLabel: "Home",
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon name="home" size={focused === true ? (25):(22)} color={focused === true ? ('white'):(tintColor)} />
            }
        }
    },
    SearchClient: {
        screen: SettingsStack,
        navigationOptions: {
            tabBarLabel: 'Search',
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon name="search" size={focused === true ? (25):(22)} color={focused === true ? ('white'):(tintColor)} />
            }
        }
    },
    SettingsClient: {
        screen: SettingsStack,
        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon name="cogs" size={focused === true ? (25):(22)} color={focused === true ? ('white'):(tintColor)} />
            }
        }
    }
},
{
    initialRouteName: 'homeClient',
    barStyle: {
        backgroundColor: '#445e79',
    },
}
))

export default ClientStack
