import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthStack from './Component/Stack/Auth'

export default createAppContainer(createSwitchNavigator({
    Auth: AuthStack
},
{
    initialRouteName: 'Auth'
}
))
