import axios from 'axios';
import { toFormData, getNow, createNotification } from '../functions';
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



const createPackage = (data, token) => new Promise((resolve, reject) => {
    data.on_delivery = Boolean(data.on_delivery);
    getUserInfo(token)
    .then(res => {
        axios.post(API + '/packages/', toFormData({ 
            ...data, 
            created_at: getNow(),
            created_by: res.data.data.app_id,
            confirmed_at: '',
            confirmed_by: null,
            catcher: null,
            waybill: ''
        }), {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => resolve(res.data.data))
        .catch(err => reject(err));
    })
    .catch(err => {
        createNotification('error', 'Nieudana autoryzacja');
    })
})



const getPDF = id => new Promise((resolve, reject) => {
    axios.get(API + `/labels/${id}/`)
    .then(res => resolve(res.data.data))
    .catch(err => reject(err));
})



const confirmPackage = (token, id, waybill, catcher) => new Promise((resolve, reject) => {
    axios.patch(API + `/packages/${id}/`, toFormData({
        waybill, 
        catcher
    }), {
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
