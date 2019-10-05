import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createStackNavigator } from 'react-navigation-stack';

import HomeClient from './Component/HomeClient'

const ClientStack = createAppContainer(createMaterialBottomTabNavigator({
    homeClient: {
        screen: HomeClient,
        navigationOptions: {
            tabBarLabel: "HomeClient"
        }
    }
},
{
    initialRouteName: 'homeClient'
}
))

export default ClientStack
