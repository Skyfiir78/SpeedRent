import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    AsyncStorage,
} from 'react-native';
import Auth from '../../../Service/Auth'

import { BarIndicator } from 'react-native-indicators';

class Loading extends Component {

    async componentDidMount(){
        let token = await AsyncStorage.getItem('speedRent:token');
        if (token === null) {
          return this.props.navigation.navigate('Auth')
        }
        let UserCurrent = await Auth.current(token)
        if (undefined !== UserCurrent.user) {
            await this.props.dispatch({
                type: 'SET_USER',
                value: {
                    isLogged: true,
                    email: UserCurrent.user.email,
                    token: UserCurrent.user.token
                }
            })
            return this.props.navigation.navigate('App')
        }else {
            return this.props.navigation.navigate('Auth')
        }
    }

    render(){
        // console.log(this.props);
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#2c3e50'}}>
                <BarIndicator size={80} color='#445e79'/>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
  return { state }
};

export default connect(mapStateToProps)(Loading)
