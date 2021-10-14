import React, { useEffect, useState } from 'react';
import { createPackage, getPDF } from '../../../api';
import { createNotification, download } from '../../../functions';
import { Link } from 'react-router-dom';
import AddNew from './AddNew';
import AddExisting from './AddExisting';
import { connect } from 'react-redux';
const ADD_NEW = 'addNew'
const ADD_EXISTING = 'addExisting'

const initAddNew = {
    recipint_name: "",
    street: "",
    home_nb: "",
    zip_code: "",
    city: "",
    recipint_email: "",
    courier_name: "",
    on_delivery: false,
    account_number: "",
}

const initAddExisting = {
    order_number: "",
    client_name: "",
    where_is_package: ""
}




const AddPackage = props => {
    const [data, setData] = useState(initAddNew);
    const [mode, setMode] = useState(ADD_NEW);

    const onChange = e => {
        var { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    useEffect(() => {
        if(mode === ADD_NEW){
            if(data.zip_code.length === 2){
                setData({
                    ...data,
                    zip_code: data.zip_code + '-'
                });
            }
        }
    }, [data]);

    useEffect(() => {
        setData(mode === ADD_NEW ? initAddNew : initAddExisting);
    }, [mode])

    const onSubmit = e => {
        e.preventDefault();
        let _data = Object.assign({}, data);
        if(mode === ADD_NEW){
            _data['order_number'] = ''
            _data['client_name'] = ''
            _data['where_is_package'] = ''
        } else {
            _data['recipint_name'] = ""
            _data['street'] = ""
            _data['home_nb'] = ""
            _data['zip_code'] = ""
            _data['city'] = ""
            _data['recipint_email'] = ""
            _data['courier_name'] = ""
            _data['on_delivery'] = false
            _data['account_number'] = ""
        }

        _data['belongs_to_new_order'] = (mode === ADD_NEW);

        createPackage(_data, props.token)
        .then(res => {
            createNotification('success', 'Dodano paczkę')
            let { id } = res;
            getPDF(id)
            .then(res => {
                download(res);
                setData(mode === ADD_NEW ? initAddNew : initAddExisting);
            })
            .catch(err => {
                console.log(err);
                createNotification('error', err.response.data.data)    
            })
        })
        .catch(err => {
            console.log(err);
            createNotification('error', err.response.data.data)
        })
    }

    return(
        <div>
            <Link
                to="/silcpost/logout"
                className="text-md text-gray-400 hover:no-underline hover:text-gray-300 float-left ml-5"
            >
                Wyloguj się
            </Link>
            <div className="w-1/3 mx-auto">
                <div className="d-flex justify-content-between bg-gray-300 text-2xl text-center mb-2 rounded-2xl">
                    <div 
                        className={`p-3 cursor-pointer w-1/2 bg-gray-${mode === ADD_NEW ? '200 border-b-8 border-purple-400' : '700'}`}
                        onClick={() => setMode('addNew')}
                    >
                        Dodaj paczkę
                    </div>
                    <div 
                        className={`p-3 cursor-pointer w-1/2 bg-gray-${mode === ADD_EXISTING ? '200 border-b-8 border-purple-400' : '700'}`}
                        onClick={() => setMode('addExisting')}
                    >
                        Dołóż paczkę
                    </div>
                </div>
                {mode === ADD_NEW ?
                    <AddNew
                        onSubmit={onSubmit}
                        data={data}
                        onChange={onChange}
                    />
                : 
                    <AddExisting
                        onSubmit={onSubmit}
                        data={data}
                        onChange={onChange}
                    />
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({ token: state.auth.token });
export const AddPackageContainer = connect(mapStateToProps, null)(AddPackage);






