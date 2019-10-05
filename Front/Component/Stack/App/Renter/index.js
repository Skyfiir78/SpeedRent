import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createStackNavigator } from 'react-navigation-stack';

import HomeRenter from './Component/HomeRenter'

const RenterStack = createAppContainer(createMaterialBottomTabNavigator({
    homeRenter: {
        screen: HomeRenter,
        navigationOptions: {
            tabBarLabel: 'homeRenter'
        }
    }
},
{
    initialRouteName: 'homeRenter'
}
))

export default RenterStack
