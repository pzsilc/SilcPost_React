import axios from 'axios';
import packageJson from '../../package.json';
import FormData from 'form-data'
const API = packageJson.backendUrl + '/api';



const login = (email, password) => new Promise((resolve, reject) => {
    axios.post(API + '/auth/login/', {
        email,
        password
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'        
        }
    })
    .then(res => resolve(res.data))
    .catch(err => reject(err))
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
    .then(res => resolve(res))
    .catch(err => reject(err))
})



const getDrugstories = token => new Promise((resolve, reject) => {
    axios.get(API + '/drugstores/', {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then(res => res.data)
    .then(res => resolve(res))
    .catch(err => reject(err))
})



const getDrugstoreDetails = (token, pk) => new Promise((resolve, reject) => {
    axios.get(API + '/drugstores/' + pk + '/', {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then(res => res.data)
    .then(res => resolve(res))
    .catch(err => reject(err))
})



const createDrugstore = (token, data) => new Promise((resolve, reject) => {
    axios.post(API + '/drugstores/', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    .then(res => res.data)
    .then(res => resolve(res))
    .catch(err => reject(err))
})



const createSchedule = (token, name, file, drugstorePk) => new Promise((resolve, reject) => {
    let data = new FormData();
    data.append('name', name);
    data.append('file', file);
    data.append('drugstore', drugstorePk);
    axios.post(API + '/schedules/', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    .then(res => res.data)
    .then(res => resolve(res))
    .catch(err => reject(err))
})



const deleteSchedule = (token, pk) => new Promise((resolve, reject) => {
    axios.delete(API + '/schedules/' + pk + '/', {
        headers: {
            'Authorization': `Token ${token}`
        }
    })
    .then(res => res.data)
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