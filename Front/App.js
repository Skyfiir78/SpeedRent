import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthStack from './Component/Stack/Auth'
import AppSwitch from './Component/Stack/App'

export default createAppContainer(createSwitchNavigator({
    Auth: AuthStack,
    App: AppSwitch
},
{
    initialRouteName: 'App'
}
))
