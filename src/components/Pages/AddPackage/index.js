import React, { useState } from 'react';
import { createPackage, getPDF } from '../../../api';
import { createNotification, download } from '../../../functions';
import { Link } from 'react-router-dom';

const initData = {
    recipint_name: "",
    recipint_address: "",
    recipint_email: "",
    courier_name: "",
    sender_name: "",
    info: ""
}

const AddPackage = () => {

    const [data, setData] = useState(initData);

    const onChange = e => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    const onSubmit = e => {
        e.preventDefault();
        createPackage(data)
        .then(res => {
            createNotification('success', 'Dodano paczkę')
            let { id } = res;
            getPDF(id)
            .then(res => {
                download(res);
                setData(initData);
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
                to="/silcpost/"
                className="text-5xl hover:no-underline hover:text-gray-300 float-left ml-5"
            >
                &#x2039;
            </Link>
            <form
                onSubmit={onSubmit}
                className="w-2/3 mx-auto text-gray-300"
            >
                <div className="mt-10 w-2/3 text-left mx-auto">
                    <h1 className="text-5xl mb-10">Nadaj paczkę</h1>
                    <div className="bg-gray-400 rounded-xl text-gray-700 p-10">
                        <label className="w-full">
                            <b className="text-xl">* Nazwa odbiorcy (imię i nazwisko / nazwa firmy)</b>
                            <br/>
                            <input
                                type="text"
                                name="recipint_name"
                                value={data.recipint_name}
                                onChange={onChange}
                                className="shadow rounded p-2 mt-2 bg-gray-200 w-full"
                                maxLength="128"
                                required
                            />
                        </label>
                        <br/>
                        <label className="w-full">
                            <b className="text-xl">* Adres odbiorcy</b>
                            <br/>
                            <input
                                type="text"
                                name="recipint_address"
                                value={data.recipint_address}
                                onChange={onChange}
                                className="shadow rounded p-2 mt-2 bg-gray-200 w-full"
                                maxLength="512"
                                required
                            />
                        </label>
                        <br/>
                        <label className="w-full">
                            <b className="text-xl">Email odbiorcy</b>
                            <br/>
                            <input
                                type="text"
                                name="recipint_email"
                                value={data.recipint_email}
                                onChange={onChange}
                                className="shadow rounded p-2 mt-2 bg-gray-200 w-full"
                                maxLength="128"
                            />
                        </label>
                        <br/>
                        <label className="w-full">
                            <b className="text-xl">* Nazwa kuriera</b>
                            <br/>
                            <input
                                type="text"
                                name="courier_name"
                                value={data.courier_name}
                                onChange={onChange}
                                className="shadow rounded p-2 mt-2 bg-gray-200 w-full"
                                maxLength="128"
                                required
                            />
                        </label>
                        <br/>
                        <label className="w-full">
                            <b className="text-xl">* Nazwa nadawcy</b>
                            <br/>
                            <input
                                type="text"
                                name="sender_name"
                                value={data.sender_name}
                                onChange={onChange}
                                className="shadow rounded p-2 mt-2 bg-gray-200 w-full"
                                maxLength="128"
                                required
                            />
                        </label>
                        <br/>
                        <label className="w-full">
                            <b className="text-xl">Co zrobić z paczką?</b>
                            <br/>
                            <textarea
                                name="info"
                                value={data.info}
                                onChange={onChange}
                                className="shadow rounded p-2 mt-2 bg-gray-200 w-full"
                            ></textarea>
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 rounded-xl mt-3 bg-purple-600 text-2xl text-purple-400"
                    >
                        <b>Nadaj</b>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddPackage;