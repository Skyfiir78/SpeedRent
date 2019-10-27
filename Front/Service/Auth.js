import Axios from 'axios'
import { AsyncStorage } from 'react-native';

const url = `http://172.20.10.2:3000/api`

export default class Auth {

    static async login(data){
        return Axios.post(`${url}/auth/login`, JSON.stringify(data), {
            headers: {
                'Content-type': 'application/json'
            }
        }).then( res => {
            return ( res.data )
        }).catch( err => {
            return ( err )
        })
    }

    static async register(data){
        return Axios.post(`${url}/auth/register`, JSON.stringify(data), {
            headers: {
                'Content-type': 'application/json'
            }
        }).then( res => {
            return ( res.data )
        }).catch( err => {
            return ( err )
        })
    }
    static async current(token){
        return Axios.get(`${url}/auth/current`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }).then( res => {
            return ( res.data )
        }).catch( err => {
            return err
        })
    }
}
