import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './Component/Login'
import Register from './Component/Register'

const AuthStack = createAppContainer(createStackNavigator({
    login: Login,
    register: Register,
},
{
    initialRouteName: 'login',
    defaultNavigationOptions: {
        header: null,
    },
}
))

export default AuthStack
