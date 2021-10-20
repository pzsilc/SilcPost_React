import React, { useEffect, useState } from 'react';
import { createPackage, getLocations, getPDF, getUserInfo } from '../../../api';
import { createNotification, download } from '../../../functions';
import { Link } from 'react-router-dom';
import AddNew from './AddNew';
import { DownloadContainer } from './../../Layout/Download';
import AddExisting from './AddExisting';
import { connect } from 'react-redux';
import formTypes from '../../../redux/form/types'
import formActions from '../../../redux/form/actions'
import authActions from '../../../redux/auth/actions'




const AddPackage = props => {

    //on change handler for fields in form reducer (main content)
    const onChange = e => props.setField(e.target.name, e.target.value)

    //fetch user
    useEffect(() => getUserInfo(props.token).then(props.fetchUser).catch(err => createNotification('error', err)), [])

    //on submit handler
    const onSubmit = e => {
        e.preventDefault()
        //prepare the rest of data
        const data = Object.assign({}, props.data)
        data['belongs_to_new_order'] = (props.mode === formTypes.NEW_MODE)
        //send request
        createPackage(data, props.token)
        .then(res => {
            createNotification('success', 'Dodano paczkę')
            getPDF(res.id)
            .then(res => {
                download(res)
                props.reset()
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
            <DownloadContainer/>
            {(props.user && props.user.data.data.is_confirmator) &&
                <React.Fragment>
                    <Link
                        to="/silcpost/confirm"
                        className="text-md text-gray-400 hover:no-underline hover:text-gray-300 float-left ml-5"
                    >
                        <i className="fa fa-scanner mr-2"></i>
                        Skanuj paczki
                    </Link> 
                    <br/>
                </React.Fragment>
            }
            <Link
                to="/silcpost/logout"
                className="text-md text-gray-400 hover:no-underline hover:text-gray-300 float-left ml-5"
            >
                <i className="fa fa-sign-out mr-2"></i>
                Wyloguj się
            </Link>
            <div className="w-1/3 mx-auto">
                <div className="d-flex justify-content-between bg-gray-300 text-2xl text-center mb-2 rounded-2xl">
                    <div 
                        className={`p-3 cursor-pointer w-1/2 bg-gray-${props.mode === formTypes.NEW_MODE ? '200 border-b-8 border-purple-400' : '700'}`}
                        onClick={() => props.switchMode(formTypes.NEW_MODE)}
                    >
                        Dodaj paczkę
                    </div>
                    <div 
                        className={`p-3 cursor-pointer w-1/2 bg-gray-${props.mode === formTypes.EXISTING_MODE ? '200 border-b-8 border-purple-400' : '700'}`}
                        onClick={() => props.switchMode(formTypes.EXISTING_MODE)}
                    >
                        Dołóż paczkę
                    </div>
                </div>
                {props.mode === formTypes.NEW_MODE ?
                    <AddNew
                        onSubmit={onSubmit}
                        data={props.data}
                        onChange={onChange}
                    />
                : 
                    <AddExisting
                        onSubmit={onSubmit}
                        data={props.data}
                        onChange={onChange}
                    />
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({ 
    token: state.auth.token,
    user: state.auth.user,
    mode: state.form.mode,
    data: state.form.data
})

const mapDispatchToProps = dispatch => ({
    fetchUser: user => dispatch(authActions.fetchUser(user)),
    setField: (name, value) => dispatch(formActions.setField(name, value)),
    switchMode: mode => dispatch(formActions.switchMode(mode)),
    reset: () => dispatch(formActions.reset())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddPackage)

