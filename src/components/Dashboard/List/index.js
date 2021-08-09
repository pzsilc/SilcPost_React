import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createDrugstore, getDrugstories } from '../../../api';
import { createNotification } from '../../../functions';
import { Link } from "react-router-dom";


const DashboardList = props => {

    const [drugstores, setDrugstores] = useState(null);

    useEffect(() => {
        fetchDrugstores();
    }, []);

    const fetchDrugstores = () => {
        getDrugstories(props.token)
        .then(res => setDrugstores(res))
        .catch(err => {
            console.log(err);
            if(props.token){
                if(props.user.drugstore){
                    props.history.push(`/dashboard/drugstores/${props.user.drugstore}`);
                } else {
                    props.history.push('/logout');
                }
            }
            createNotification('error', 'Nie udało się pobrać danych');
        });
    }

    const createNewDrugstore = e => {
        e.preventDefault();
        const { value } = e.target.name;
        createDrugstore(props.token, { name: value })
        .then(res => {
            console.log(res);
            createNotification('success', 'Utworzono drogerię');
            fetchDrugstores();
        })
        .catch(err => {
            if(err.response){
                const { detail } = err.response.data;
                for(const [key, value] of Object.entries(detail)){
                    createNotification('error', value[0]);
                }
            }
            else {
                console.log(err);
                createNotification('error', 'Coś poszło nie tak.')
            }
        })
    }

    return(
        <div className="border p-5 md:p-10 w-11/12 md:w-1/2 mx-auto mt-32 mb-48 shadow-xl">
            <div className="flex justify-between">
                <h1 className="text-md md:text-lg lg:text-2xl pb-5">
                    <i className="fa fa-user mr-3"></i>
                    {props.user.email}
                </h1>
                {props.user.is_superuser && <span className="hidden md:block text-gray-400 mt-1">Administrator</span>}
                {!props.user.is_superuser && <span className="hidden md:block text-gray-400 mt-1">Pracownik</span>}
            </div>
            <hr/>
            {drugstores &&
                <div className="mt-10">
                    <form
                        onSubmit={createNewDrugstore}
                        className="m-10"
                    >
                        <b>
                            <i className="fa fa-plus mr-2"></i>
                            Dodaj nową drogerię
                        </b>
                        <br/>
                        <br/>
                        <input 
                            type="text" 
                            name="name" 
                            className="border p-2 mr-1" 
                            maxLength="64"
                            placeholder="Nazwa"
                            required
                        />
                        <input
                            type="submit"
                            className="bg-green-400 p-2 border border-green-400"
                        />
                    </form>
                    <hr/>
                    <div className="pt-10">
                        <h3 className="text-xl mt-5 pb-3">
                            <i className="fa fa-list mr-3"></i>
                            Lista drogerii
                        </h3>
                        <table className="w-10/12 mx-auto p-2 mt-5 text-center text-sm md:text-md">
                            <thead className="bg-green-500">
                                <tr>
                                    <th>ID</th>
                                    <th>Nazwa</th>
                                    <th>Odnośniki</th>
                                </tr>
                            </thead>
                            <tbody>
                                {drugstores.map((ds, key) =>
                                    <tr 
                                        key={key}
                                        className={key % 2 === 0 ? 'bg-green-400' : 'bg-green-300'}
                                    >
                                        <td className="p-2"><b>{ds.pk}</b></td>
                                        <td className="p-2">{ds.name}</td>
                                        <td className="p-2">
                                            <Link 
                                                className="text-green-100"
                                                to={`/dashboard/drugstores/${ds.pk}`}
                                            >
                                                <i className="fa fa-sign-out-alt mr-2"></i>
                                                Zobacz grafiki
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    token: state.auth.token,
    user: state.auth.user
})

export const DashboardListContainer = connect(
    mapStateToProps, 
    null
)(DashboardList);