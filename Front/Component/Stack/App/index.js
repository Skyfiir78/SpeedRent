import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import ClientStack from './Client'
import RenterStack from './Renter'

const AppSwitch = createAppContainer(createSwitchNavigator({
    ClientStack: ClientStack,
    RenterStack: RenterStack
},
{
    initialRouteName: 'RenterStack'
}
))

export default AppSwitch
