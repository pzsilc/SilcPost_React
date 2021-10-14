import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { confirmPackage, getPackages, getExcel } from '../../../api';
import { createNotification, download } from '../../../functions';
import ExistingList from './ExistingList';
import NewList from './NewList';
import Input from './Input';



const ConfirmPackages = props => {

    const [code, setCode] = useState("");
    const [packages, setPackages] = useState([]);
    const [displayModal, setDisplayModal] = useState(false);

    const submit = e => {
        e.preventDefault();
        const { id, waybill, catcher } = e.target;
        confirmPackage(props.token, id.value, waybill.value, catcher.value)
        .then(() => {
            createNotification('success', 'Zatwierdzono');
            fetchPackages();
            reset();
            focusInput();
        })
        .catch(err => {
            console.log(err);
            reset();
            if(err.response && err.response.status === 404){
                createNotification('error', 'Podany nr paczki nie istnieje');
            }
            else createNotification('error', 'Coś poszło nie tak');
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        if(!packages.find(p => p.id == code)){
            setCode("");
            return createNotification('error', 'Brak paczki');
        }
        setDisplayModal(true);
    }

    const focusInput = () => document.querySelector('input[name="_code"]').focus();

    const onChange = e => setCode(e.target.value);

    const reset = () => {
        setCode("");
        setDisplayModal(false);
    }

    const fetchPackages = () => {
        getPackages(props.token)
        .then(res => {
            setPackages(res);
        })
        .catch(err => {
            console.log(err);
            createNotification('error', 'Nie udało się pobrać listy paczek')
        })
    }

    const getStatistics = () => {
        getExcel(props.token)
        .then(res => {
            console.log(res)
            download(res.data, 'xlsx');
        })
        .catch(err => {
            console.log(err);
            createNotification('error', 'Nie udało się pobrać statystyk');
        })
    }

    useEffect(() => {
        fetchPackages();
        focusInput();
    }, [])

    const newPackages = [];
    const existingPackages = [];
    packages.forEach(p => {
        if(parseInt(p.belongs_to_new_order)){
            newPackages.push(p)
        } else {
            existingPackages.push(p);
        }
    })

    return(
        <div className="w-10/12 mx-auto pb-36">
            <div id="mainModal"></div>
            <Input
                displayModal={displayModal}
                setDisplayModal={setDisplayModal}
                code={code}
                submit={submit}
                getStatistics={getStatistics}
                onChange={onChange}
                onSubmit={onSubmit}
            />
            <NewList packages={newPackages}/>
            <ExistingList packages={existingPackages} />
        </div>
    )
}



const mapStateToProps = state => ({ token: state.auth.token });
export const ConfirmPackagesContainer = connect(mapStateToProps, null)(ConfirmPackages);