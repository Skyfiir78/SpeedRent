import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createStackNavigator } from 'react-navigation-stack';

import HomeClient from './Component/HomeClient'
import SettingsClient from './Component/SettingsClient'

const ClientStack = createAppContainer(createMaterialBottomTabNavigator({
    homeClient: {
        screen: HomeClient,
        navigationOptions: {
            tabBarLabel: "HomeClient"
        }
    },
    SettingsClient: {
        screen: SettingsClient,
        navigationOptions: {
            tabBarLabel: 'SettingsClient'
        }
    }
},
{
    initialRouteName: 'homeClient'
}
))

export default ClientStack
