import axios from 'axios';
import { toFormData } from '../functions';
import packageJson from '../../package.json';
const API = packageJson.backendUrl + '/api';



const login = (email, password) => new Promise((resolve, reject) => {
    axios.post(API + '/auth/login/', toFormData({
        email,
        password
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
    axios.post(API + '/auth/logout/', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    .then(res => resolve(res.data))
    .catch(err => reject(err))
})



const getUserInfo = token => new Promise((resolve, reject) => {
    axios.get(API + '/auth/user/', {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then(res => {
        resolve(res)
    })
    .catch(err => reject(err))
})



const getDrugstories = token => new Promise((resolve, reject) => {
    axios.get(API + '/drugstores/', {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then(res => res.data.data)
    .then(res => resolve(res))
    .catch(err => reject(err))
})



const getDrugstoreDetails = (token, id) => new Promise((resolve, reject) => {
    axios.get(API + '/drugstores/' + id + '/', {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then(res => res.data)
    .then(res => resolve(res))
    .catch(err => reject(err))
})



const createDrugstore = (token, data) => new Promise((resolve, reject) => {
    axios.post(API + '/drugstores/', toFormData(data), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    .then(res => res.data)
    .then(res => resolve(res))
    .catch(err => reject(err))
})



const createSchedule = (token, name, file, drugstore) => new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        axios.post(API + '/schedules/', toFormData({
            name,
            file_input: reader.result,
            drugstore
        }), {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => {
            console.log(err.response);
            reject(err);
        })
    }
    reader.onerror = err => reject(err);
})



const deleteSchedule = (token, id) => new Promise((resolve, reject) => {
    axios.delete(API + '/schedules/' + id + '/', {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then(res => {console.log(res); return res.data})
    .then(res => resolve(res))
    .catch(err => reject(err))
})




export {
    login,
    logout,
    getUserInfo,
    getDrugstories,
    getDrugstoreDetails,
    createDrugstore,
    createSchedule,
    deleteSchedule
}
