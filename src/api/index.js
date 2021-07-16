import axios from 'axios';
import packageJson from '../../package.json';
const API = packageJson.backendUrl + '/api';


class ReasonsHandler{
    static getReasons = () => new Promise((resolve, reject) => {
        axios.get(API + '/reasons/')
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err.response))
    })

    static postReason = data => new Promise((resolve, reject) => {
        axios.post(API + '/reasons/', data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err.response))
    })

    static patchReason = data => new Promise((resolve, reject) => {
        axios.patch(API + `/reasons/${data.id}/`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err.response))
    })

    static deleteReasons = id => new Promise((resolve, reject) => {
        axios.delete(API + `/reasons/${id}/`)
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err.response))
    })
}



class StatusesHandler{
    static getStatuses = () => new Promise((resolve, reject) => {
        axios.get(API + '/statuses/')
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err.response))
    })

    static postStatus = data => new Promise((resolve, reject) => {
        axios.post(API + '/statuses/', data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err.response))
    })
}



class ComplaintsHandler{
    static getComplaints = (filters, token) => new Promise((resolve, reject) => {
        let vars = filters ? Object.keys(filters).map(key => key + '=' + filters[key]).join(', ') : "";
        axios.get(API + `/complaints/?${vars}`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err.response))
    })

    static getOneComplaint = key => new Promise((resolve, reject) => {
        axios.get(API + `/complaints/${key}/`)
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err.response))
    })

    static postComplaint = data => new Promise((resolve, reject) => {
        axios.post(API + '/complaints/', data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err.response))
    })

    static patchComplaint = (id, data, token) => new Promise((resolve, reject) => {
        axios.patch(API + `/complaints/${id}/`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err.response))
    })

    static deleteComplaint = (id, token) => new Promise((resolve, reject) => {
        axios.put(API + `/complaints/${id}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err.response))
    })

    static checkIfExistsByDocumentNumber = documentNumber => new Promise((resolve, reject) => {
        axios.post(API + `/documents/`, { documentNumber }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(res => resolve(res))
        .then(err => reject(err));
    })

    static getOrderByComplaintKey = key => new Promise((resolve, reject) => {
        axios.post(API + `/documents/orders/`, { key }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(res => resolve(res))
        .then(err => reject(err));
    })
}



class AuthHandler{
    static login = (username, password) => new Promise((resolve, reject) => {
        axios.post(API + '/auth/login/', {
            username,
            password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })

    static logout = token => new Promise((resolve, reject) => {
        axios.post(API + '/auth/logout/', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })

    static getUserInfo = token => new Promise((resolve, reject) => {
        axios.get(API + '/auth/user/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}






export {
    ReasonsHandler,
    StatusesHandler,
    ComplaintsHandler,
    AuthHandler
}