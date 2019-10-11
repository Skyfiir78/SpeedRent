import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    AsyncStorage,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import {
    Input,
    Label,
    Button
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

export default class RegisterScreen extends Component {

    async onLogin(email, password){
        console.log(email);
        console.log(password);
    }

    async onResetPassword(email){
        console.log(email);
    }

    render(){
        return(
            <View style={{backgroundColor:'#2c3e50', height: '100%', paddingLeft: 20, paddingRight: 20}}>
                <View style={{alignItems:'center', marginTop: 70}}>
                    <Text style={{fontSize: 24, color: '#bdc3c7'}}>Start to rent your new car !</Text>
                </View>
                <View style={{direction: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 70}}>
                    <Input
                        placeholderTextColor={'#2c3e50'}
                        inputContainerStyle={style.inputContainer}
                        inputStyle={style.inputStyle}
                        placeholder='Email'
                        leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#2c3e50' }}
                        leftIconContainerStyle={style.iconContainer}
                    />
                    <Input
                        inputContainerStyle={style.inputContainer}
                        inputStyle={style.inputStyle}
                        secureTextEntry={true}
                        placeholder='Password'
                        leftIcon={{ type: 'font-awesome', name: 'lock', color: '#2c3e50' }}
                        leftIconContainerStyle={style.iconContainer}
                    />
                    <Input
                        inputContainerStyle={style.inputContainer}
                        inputStyle={style.inputStyle}
                        secureTextEntry={true}
                        placeholder='Confirme password'
                        leftIcon={{ type: 'font-awesome', name: 'lock', color: '#2c3e50' }}
                        leftIconContainerStyle={style.iconContainer}
                    />
                        <Button
                            containerStyle={style.buttonContainer}
                            buttonStyle={style.buttonStyle}
                            title='Register'
                            ViewComponent={LinearGradient}
                            linearGradientProps={{
                                colors: ['#0F2027', '#203A43', '#2C5364'],
                                start: { x: 0, y: 0.5 },
                                end: { x: 1, y: 0.5 },
                              }}
                        />
                    <Text style={{marginTop: 15}}>Or</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('login')} style={{ marginTop: 15}}>
                        <Text style={{color: '#445e90', fontSize: 18}}>Sign In !</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const style = {
    inputContainer: {
        borderBottomWidth: 0,
        // paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: '#445e79',
        borderRadius: 20,
        marginBottom: 40
    },
    inputStyle: {
        color: '#2c3e50'
    },
    buttonStyle: {
        marginTop: 15,
        backgroundColor: 'red',
        borderRadius: 20,
        paddingLeft: 50,
        paddingRight: 50,
    },
    buttonContainer: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    iconContainer: {
        marginRight: 10,
    }
}
