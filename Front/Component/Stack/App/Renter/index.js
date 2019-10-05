import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeRenter from './Component/HomeRenter'

const RenterStack = createAppContainer(createStackNavigator({
    homeRenter: HomeRenter
},
{
    initialRouteName: 'homeRenter'
}
))

export default RenterStack
