import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { confirmPackage, getPackages } from '../../../api';
import { createNotification } from '../../../functions';
import ExistingList from './ExistingList';
import NewList from './NewList';
import Input from './Input';



const ConfirmPackages = props => {

    const [code, setCode] = useState("");
    const [withWaybill, setWithWaybill] = useState(false);
    const [packages, setPackages] = useState([]);
    const [displayModal, setDisplayModal] = useState(false);

    useEffect(() => {
        if(displayModal){
            let p = packages.find(i => i.id == code)
            if(p){
                console.log(p)
                setWithWaybill(Boolean(parseInt(p.belongs_to_new_order)))
            }
        }
    }, [displayModal])

    const submit = e => {
        e.preventDefault();
        const { id, waybill, catcher } = e.target;
        confirmPackage(props.token, id.value, waybill ? waybill.value : "", catcher.value)
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
                withWaybill={withWaybill}
                displayModal={displayModal}
                setDisplayModal={setDisplayModal}
                code={code}
                submit={submit}
                onChange={onChange}
                onSubmit={onSubmit}
            />
            <NewList packages={newPackages}/>
            <ExistingList packages={existingPackages} />
        </div>
    )
}



const mapStateToProps = state => ({ token: state.auth.token });
export default connect(mapStateToProps, null)(ConfirmPackages);