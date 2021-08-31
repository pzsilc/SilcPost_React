import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createSchedule, deleteSchedule, getDrugstoreDetails } from '../../../api';
import { createNotification } from '../../../functions';
import { Link } from "react-router-dom";
import packageJson from '../../../../package.json';


const DashboardSingle = props => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const id = props.match.params.id;
        getDrugstoreDetails(props.token, id)
        .then(res => {
            setData(res.data)
        })
        .catch(err => {
            console.log(err);
            setError(true);
        })
    }

    const createNewSchedule = e => {
        e.preventDefault();
        const { name, file } = e.target;
        createSchedule(props.token, name.value, file.files[0], data.id)
        .then(res => {
            console.log(res);
            createNotification('success', 'Dodano pomyślnie');
            fetchData();
            setFile(null);
            document.querySelector('input[name="name"]').value = "";
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

    const delSchedule = id => {
        deleteSchedule(props.token, id)
        .then(res => {
            createNotification('success', 'Usunięto pomyślnie');
            fetchData();
        })
        .catch(err => {
            console.log(err);
            createNotification('error', 'Coś poszło nie tak');
        })
    }

    const onClick = schedule => {
        const base64 = `data:application/xlsx;base64,${schedule}`;
        const a = document.createElement('a');
        const name = "grafik.xlsx";
        a.href = base64;
        a.download = name;
        a.click();
    }

    if(error){
        return(
            <div>
                <div className="my-64 py-32 text-center text-5xl text-gray-200">
                    404 | Coś poszło nie tak :(
                </div>
                <img
                    src="/grafiki/cj.png"
                    style={{
                        position: 'absolute',
                        right: '0',
                        width: '300px',
                        marginTop: '-513px'
                    }}
                    alt="CJ"
                />
            </div>
        )
    }
    else if(!data){
        return(
            <React.Fragment>
                <div className="text-9xl text-center mt-36 mb-5 pt-36">
                    <i className="fa fa-cog fa-spin"></i>
                </div>
                <p className="text-center mb-36 pb-16">Pobieram dane...</p>
            </React.Fragment>
        )
    }
    else{
        return(
            <React.Fragment>
                {Boolean(props.user.is_superuser) &&
                    <Link
                        to="/grafiki/dashboard/"
                        className="text-7xl ml-5"
                    >&#x2039;</Link>
                }
                <div className="border shadow-xl w-11/12 lg:w-1/2 mx-auto p-3 md:p-10 mt-36 mb-96">
                    <div className="text-center">
                        <h1 className="text-xl md:text-3xl">{data.name}</h1>
                        <small className="text-gray-400 float-right -mt-10">ID: {data.id}</small>
                    </div>
                    <div>
                        {Boolean(props.user.is_superuser) &&
                            <React.Fragment>
                                <form
                                    onSubmit={createNewSchedule}
                                    className="my-8"
                                >
                                    <b>
                                        <i className="fa fa-plus mr-2"></i>
                                        Dodaj grafik
                                    </b>
                                    <br/>
                                    <br/>
                                    <div className="w-full md:w-1/2 lg:w-1/3">
                                        <input
                                            type="text"
                                            name="name"
                                            className="border p-1 my-2 rounded pl-2 w-full"
                                            placeholder="Nazwa"
                                            required
                                        />
                                        <br/>
                                        <label>
                                            <input
                                                type="file"
                                                accept=".xlsx"
                                                name="file"
                                                className="hidden"
                                                onChange={e => setFile(e.target)}
                                                required
                                            />
                                            <div className="text-center bg-green-500 rounded-xl text-green-200 py-1 cursor-pointer w-full">
                                                <i className="fa fa-download text-xl mr-3"></i>
                                                Plik .xlsx
                                                {file &&
                                                    <small><br/>{file.files[0].name}</small>
                                                }
                                            </div>
                                        </label>
                                        <input
                                            type="submit"
                                            className="bg-green-400 p-2 px-3 cursor-pointer w-full rounded-xl mt-2 text-white"
                                            value="Dodaj"
                                        />
                                    </div>
                                </form>
                                <hr/>
                            </React.Fragment>
                        }
                        <h3 className="text-xl my-10 mt-5">Grafiki</h3>
                        {data.schedules.map((sd, key) =>
                            <div
                                key={key}
                                className="m-3 w-full flex justify-between"
                            >
                                <div className="flex">
                                    <button
                                        className="fa fa-download text-3xl"
                                        onClick={() => onClick(sd.file)}
                                    >
                                        <p style={{ fontSize: '10px', marginTop: '-10px' }}>Pobierz</p>
                                    </button>
                                    <p className="ml-5 mt-4">{sd.name}</p>
                                </div>
                                <span className="text-gray-400 mr-3">
                                    {sd.created_at}
                                    {Boolean(props.user.is_superuser) &&
                                        <React.Fragment>
                                            <br/>
                                            <button
                                                type="button"
                                                onClick={() => delSchedule(sd.id)}
                                                className="bg-red-500 p-1 px-2 float-right text-white rounded"
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </React.Fragment>

                                    }
                                </span>
                            </div>
                        )}
                        {!data.schedules.length &&
                            <div className="text-center text-gray-300 pb-32">Brak grafików</div>
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


const mapStateToProps = state => ({
    token: state.auth.token,
    user: state.auth.user
})

export const DashboardSingleContainer = connect(
    mapStateToProps,
    null
)(DashboardSingle);
