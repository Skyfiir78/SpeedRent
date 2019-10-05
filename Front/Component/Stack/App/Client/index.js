import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeClient from './Component/HomeClient'

const ClientStack = createAppContainer(createStackNavigator({
    homeClient: HomeClient
},
{
    initialRouteName: 'homeClient'
}
))

export default ClientStack
