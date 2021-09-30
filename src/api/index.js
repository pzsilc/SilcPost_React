import axios from 'axios';
import { toFormData, getNow } from '../functions';
import packageJson from '../../package.json';
const API = packageJson.backendUrl + '/api';



const login = (email, token) => new Promise((resolve, reject) => {
    axios.post(API + '/auth/login/', toFormData({
        email,
        token
    }), {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(res => {
        console.log(res)
        resolve(res.data)
    })
    .catch(err => {
        console.log(err.response)
        reject(err)
    })
})



const logout = token => new Promise((resolve, reject) => {
    axios.post(API + '/auth/logout/', {}, {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then(res => resolve(res.data))
    .catch(err => reject(err))
})



const getUserInfo = token => new Promise((resolve, reject) => {
    axios.get(API + '/auth/get-user/', {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then(res => resolve(res))
    .catch(err => reject(err))
})



const getPackages = token => new Promise((resolve, reject) => {
    axios.get(API + '/packages/', {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then(res => resolve(res.data.data))
    .catch(err => reject(err))
})



const createPackage = data => new Promise((resolve, reject) => {
    axios.post(API + '/packages/', toFormData({ 
        ...data, 
        created_at: getNow(),
        confirmed_at: '',
        confirmed_by: null
    }), {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(res => resolve(res.data.data))
    .catch(err => reject(err));
})



const getPDF = id => new Promise((resolve, reject) => {
    axios.get(API + `/labels/${id}/`)
    .then(res => resolve(res.data.data))
    .catch(err => reject(err));
})



const confirmPackage = (token, id) => new Promise((resolve, reject) => {
    axios.patch(API + `/packages/${id}/`, {}, {
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(res => resolve(res.data))
    .catch(err => reject(err));
})



const getExcel = token => new Promise((resolve, reject) => {
    axios.get(API + '/packages/statistics/', {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then(res => resolve(res.data))
    .catch(err => reject(err))
})



export {
    login,
    logout,
    getUserInfo,
    createPackage,
    getPDF,
    confirmPackage,
    getPackages,
    getExcel
}
