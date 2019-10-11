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
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            passwordConfirme: '',
            error: {
                email: {
                    active: false,
                    message: '',
                },
                password: {
                    active: false,
                    message: '',
                },
                passwordConfirme: {
                    active: false,
                    message: '',
                }
            }
        }
        this.onRegister = this.onRegister.bind(this)
        this.checkError = this.checkError.bind(this)
    }

    async onInputChange(e){
        const name = e.name
        const value = e.value
        await this.setState({[name]: value})
    }

    async onRegister(){
        if (await this.checkError() === false) {
            console.log('err');
            return 'err'
        }
        console.log('connect');
    }

    validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    }

    async checkError(){
        const { email, password, passwordConfirme, error } = this.state
        let errorExist = false
        if (this.validateEmail(email) !== true) {
            error.email.active = true
            error.email.message = 'Format email non valide'
            errorExist = true
        }else {
            error.email.active = false
            error.email.message = ''
        }
        if (password.length <= 6) {
            error.password.active = true
            error.password.message = 'Format password invalide'
            errorExist = true
        }else {
            error.password.active = false
            error.password.message = ''
        }
        if (passwordConfirme !== password) {
            error.passwordConfirme.active = true
            error.passwordConfirme.message = 'Les mot de passe ne corresponde pas'
            errorExist = true
        }else {
            error.passwordConfirme.active = false
            error.passwordConfirme.message = ''
        }
        await this.setState({error: error})
        if (errorExist) {
            return false
        }
    }

    render(){
        return(
            <View style={{backgroundColor:'#2c3e50', height: '100%', paddingLeft: 20, paddingRight: 20}}>
                <View style={{alignItems:'center', marginTop: 70}}>
                    <Text style={{fontSize: 24, color: '#bdc3c7'}}>Start to rent your new car !</Text>
                </View>
                <View style={{direction: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 70}}>
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
                        this.state.error.passwordConfirme.active === false ? (
                            <Input
                                value={this.state.passwordConfirme}
                                onChangeText={(text) => this.onInputChange({name: 'passwordConfirme', value: text})}
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
                                    value={this.state.passwordConfirme}
                                    onChangeText={(text) => this.onInputChange({name: 'passwordConfirme', value: text})}
                                    placeholderTextColor={'#2c3e50'}
                                    inputContainerStyle={styledError.inputContainer}
                                    inputStyle={style.inputStyle}
                                    placeholder='PasswordConfirme'
                                    leftIcon={{ type: 'font-awesome', name: 'lock', color: '#2c3e50' }}
                                    leftIconContainerStyle={style.iconContainer}
                                />
                                <Text style={{color:'red', paddingLeft: 20}}>{this.state.error.passwordConfirme.message}</Text>
                            </View>
                        )
                    }
                        <Button
                            onPress={() => this.onRegister()}
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

const styledError = {
    inputContainer: {
        borderWidth: 1,
        borderColor: 'red',
        paddingRight: 25,
        backgroundColor: '#445e79',
        borderRadius: 20,
    },
}
