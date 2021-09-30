import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { confirmPackage, getPackages, getExcel } from '../../../api';
import { createNotification, download } from '../../../functions';

const ConfirmPackages = props => {

    const [code, setCode] = useState("");
    const [packages, setPackages] = useState([]);

    const onSubmit = e => {
        e.preventDefault();
        confirmPackage(props.token, code)
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

    const focusInput = () => document.querySelector('input[name="_code"]').focus();

    const onChange = e => setCode(e.target.value);

    const reset = () => setCode("");

    const fetchPackages = () => {
        getPackages(props.token)
        .then(res => {
            setPackages(res)
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

    return(
        <div className="w-10/12 mx-auto pb-36">
            <div className="d-flex justify-content-between bg-gray-400 p-3">
                <h3 className="text-xl text-gray-300">
                    <b>Sekcja skanowania</b>
                </h3>
                <div>
                    <button 
                        onClick={getStatistics}
                        className="hover:no-underline mr-5"
                    >
                        <i className="fa fa-download mr-2"></i>
                        Pobierz statystyki
                    </button>
                    <Link 
                        to="/silcpost/logout"
                        className="hover:no-underline"
                    >
                        <i className="fa fa-sign-out-alt mr-2"></i>
                        Wyloguj się
                    </Link>
                </div>
            </div>
            <form 
                className="bg-gray-200 p-3"
                onSubmit={onSubmit}
            >
                <input
                    input="text"
                    name="_code"
                    value={code}
                    onChange={onChange}
                    className="bg-yellow-200 w-full p-5"
                    style={{ fontSize: '120px' }}
                />
            </form>
            <div className="mt-10 bg-gray-500">
                <h3 className="p-3 text-xl text-gray-400">
                    <b>Lista zamówień w oczekiwaniu</b>
                </h3>
                {packages.length !== 0 &&
                    <table className="w-full">
                        <thead>
                            <tr className="text-purple-500 bg-gray-700">
                                <th className="p-2">Nazwa odbiorcy</th>
                                <th className="p-2">Adres odbiorcy</th>
                                <th className="p-2">Email odbiorcy</th>
                                <th className="p-2">Nazwa kuriera</th>
                                <th className="p-2">Nazwa nadawcy</th>
                                <th className="p-2">Co zrobić z paczką</th>
                                <th className="p-2">Data dodania</th>
                            </tr>
                        </thead>
                        <tbody>
                            {packages.map((p, key) => 
                                <tr 
                                    key={key}
                                    className={`bg-gray-${key % 2 === 0 ? '400' : '500'}`}
                                >
                                    <td className="p-2">{p.recipint_name}</td>
                                    <td className="p-2">{p.recipint_address}</td>
                                    <td className="p-2">{p.recipint_email}</td>
                                    <td className="p-2">{p.courier_name}</td>
                                    <td className="p-2">{p.sender_name}</td>
                                    <td className="p-2">{p.info}</td>
                                    <td className="p-2">{p.created_at}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                }
                {packages.length === 0 &&
                    <p className="text-center mt-10 bg-gray-400 py-2 text-gray-300">Brak zamówień</p>
                }
            </div>
        </div>
    )
}



const mapStateToProps = state => ({ token: state.auth.token });
export const ConfirmPackagesContainer = connect(mapStateToProps, null)(ConfirmPackages);