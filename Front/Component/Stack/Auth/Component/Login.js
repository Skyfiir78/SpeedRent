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
import Auth from '../../../../Service/Auth'

import FadeIn from '../../../Animation/FadeIn'

export default class LoginScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            email: '',
            password: '',
            error: {
                email: {
                    active: false,
                    message: 'erreur email',
                },
                password: {
                    active: false,
                    message: 'erreur password',
                }
            },
            connexionMessage: ''
        }
        this.onLogin = this.onLogin.bind(this)
        this.checkError = this.checkError.bind(this)
    }

    async onInputChange(e){
        const name = e.name
        const value = e.value
        await this.setState({[name]: value})
    }

    async onLogin(){
        const { email, password } = this.state
        await this.setState({loading: true, connexionMessage: ''})
        if (await this.checkError() === false) {
            console.log('err');
            await this.setState({loading: false})
            return 'err'
        }
        let connectResult = await Auth.login({
            user: {
                email: email,
                password: password,
            }
        })
        if (connectResult.errors !== undefined) {
            await this.setState({connexionMessage: connectResult.errors.message})
        }
        if (connectResult.user !== undefined) {
            await AsyncStorage.setItem('speedRent:token', connectResult.user.token)
            return this.props.navigation.navigate('App')
        }
        await this.setState({loading: false})
    }

    validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    }

    async checkError(){
        const { email, password, error } = this.state
        let errorExist = false
        if (this.validateEmail(email) !== true) {
            error.email.active = true
            error.email.message = 'Format email non valide'
            errorExist = true
        }else {
            error.email.active = false
            error.email.message = ''
        }
        if (this.state.password.length <= 6) {
            error.password.active = true
            error.password.message = 'Format password invalide'
            errorExist = true
        }else {
            error.password.active = false
            error.password.message = ''
        }
        await this.setState({error: error})
        if (errorExist) {
            return false
        }
    }

    render(){
        return(
            <View style={{backgroundColor:'#2c3e50', height: '100%'}}>
                <View style={{alignItems:'center', marginTop: 70}}>
                    <View style={{
                            backgroundColor:'#445e79',
                            borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                            width: Dimensions.get('window').width * 0.35,
                            height: Dimensions.get('window').width * 0.35,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <Icon
                            raised
                            name='car'
                            type='font-awesome'
                            color='#2c3e50'
                            size={80}
                        />
                    </View>
                </View>
                <View style={{direction: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 70, paddingLeft: 20, paddingRight: 20}}>
                    {
                        this.state.error.email.active === false ? (
                            <Input
                                value={this.state.email}
                                onChangeText={(text) => this.onInputChange({name: 'email', value: text})}
                                placeholderTextColor={'#2c3e50'}
                                inputContainerStyle={style.inputContainer}
                                inputStyle={style.inputStyle}
                                placeholder='Email'
                                leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#2c3e50' }}
                                leftIconContainerStyle={style.iconContainer}
                            />
                        ): (
                            <View style={{width: '100%', marginBottom: 40}}>
                                <Input
                                    value={this.state.email}
                                    onChangeText={(text) => this.onInputChange({name: 'email', value: text})}
                                    placeholderTextColor={'#2c3e50'}
                                    inputContainerStyle={styledError.inputContainer}
                                    inputStyle={style.inputStyle}
                                    placeholder='Email'
                                    leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#2c3e50' }}
                                    leftIconContainerStyle={style.iconContainer}
                                />
                                <Text style={{color:'red', paddingLeft: 20}}>{this.state.error.email.message}</Text>
                            </View>
                        )
                    }
                    {
                        this.state.error.password.active === false ? (
                            <Input
                                value={this.state.password}
                                onChangeText={(text) => this.onInputChange({name: 'password', value: text})}
                                inputContainerStyle={style.inputContainer}
                                inputStyle={style.inputStyle}
                                secureTextEntry={true}
                                placeholder='Password'
                                leftIcon={{ type: 'font-awesome', name: 'lock', color: '#2c3e50' }}
                                leftIconContainerStyle={style.iconContainer}
                            />
                        ): (
                            <View style={{width: '100%', marginBottom: 40}}>
                                <Input
                                    value={this.state.password}
                                    onChangeText={(text) => this.onInputChange({name: 'password', value: text})}
                                    placeholderTextColor={'#2c3e50'}
                                    inputContainerStyle={styledError.inputContainer}
                                    inputStyle={style.inputStyle}
                                    placeholder='Password'
                                    leftIcon={{ type: 'font-awesome', name: 'lock', color: '#2c3e50' }}
                                    leftIconContainerStyle={style.iconContainer}
                                />
                                <Text style={{color:'red', paddingLeft: 20}}>{this.state.error.password.message}</Text>
                            </View>
                        )
                    }
                    {
                        this.state.connexionMessage !== '' ? (
                            <Text style={{color: 'red'}}>{this.state.connexionMessage}</Text>
                        ) : (
                            null
                        )
                    }
                    {
                        this.state.loading === true ? (
                            <Button
                                containerStyle={style.buttonContainer}
                                buttonStyle={style.buttonStyle}
                                title='LOGIN'
                                loading
                                ViewComponent={LinearGradient}
                                linearGradientProps={{
                                    colors: ['#0F2027', '#203A43', '#2C5364'],
                                    start: { x: 0, y: 0.5 },
                                    end: { x: 1, y: 0.5 },
                                  }}
                            />
                        ):(
                            <Button
                                onPress={() => this.onLogin()}
                                containerStyle={style.buttonContainer}
                                buttonStyle={style.buttonStyle}
                                title='LOGIN'
                                ViewComponent={LinearGradient}
                                linearGradientProps={{
                                    colors: ['#0F2027', '#203A43', '#2C5364'],
                                    start: { x: 0, y: 0.5 },
                                    end: { x: 1, y: 0.5 },
                                  }}
                            />
                        )
                    }
                    <Text style={{marginTop: 15}}>Or</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('register')} style={{ marginTop: 15}}>
                        <Text style={{color: '#445e90', fontSize: 18}}>Sign Up !</Text>
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
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    iconContainer: {
        marginRight: 10,
    }
}

const styledError = {
    inputContainer: {
        borderWidth: 1,
        borderColor: 'red',
        paddingRight: 25,
        backgroundColor: '#445e79',
        borderRadius: 20,
    },
}
