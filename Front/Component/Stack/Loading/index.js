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

import { BarIndicator } from 'react-native-indicators';

class Loading extends Component {

    async componentDidMount(){
        await this.props.dispatch({type: 'SET_USER', value: {isLogged: true, email: 'test', token: 'test'}})
    }

    render(){
        console.log(this.props);
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <BarIndicator size={80} color='black'/>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
  return { state }
};

export default connect(mapStateToProps)(Loading)
