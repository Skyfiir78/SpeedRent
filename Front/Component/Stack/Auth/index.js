import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './Component/Login'
import RegisterScreen from './Component/Register'

const AuthStack = createAppContainer(createSwitchNavigator({
    login: LoginScreen,
    register: RegisterScreen,
},
{
    initialRouteName: 'login',
    defaultNavigationOptions: {
        header: null,
    },
}
))

export default AuthStack
