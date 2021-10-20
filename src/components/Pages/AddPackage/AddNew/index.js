import React from 'react';
import Switch from 'react-input-switch';

const AddNew = props => {
    return(
        <form
            onSubmit={props.onSubmit}
            className="text-gray-300"
        >
            <div className="text-left mx-auto">
                <div className="bg-gray-400 rounded-xl text-gray-700 p-10">
                    <div className="flex">
                        <input
                            type="text"
                            name="recipint_name"
                            value={props.data.recipint_name}
                            onChange={props.onChange}
                            className="shadow rounded p-2 mt-2 bg-gray-200 w-full"
                            maxLength="128"
                            placeholder="Nazwa odbiorcy (imię i nazwisko / nazwa firmy)"
                            required
                        />
                    </div>
                    <div className="flex">
                        <input
                            type="text"
                            name="street"
                            value={props.data.street}
                            onChange={props.onChange}
                            className="shadow rounded p-2 mt-2 mr-1 bg-gray-200 w-full"
                            maxLength="512"
                            placeholder="Ulica"
                            required
                        />
                        <input
                            type="text"
                            name="home_nb"
                            value={props.data.home_nb}
                            onChange={props.onChange}
                            className="shadow rounded p-2 mt-2 mx-1 bg-gray-200 w-full"
                            maxLength="512"
                            placeholder="Nr domu"
                            required
                        />
                        <input
                            type="text"
                            name="zip_code"
                            value={props.data.zip_code}
                            onChange={props.onChange}
                            className="shadow rounded p-2 mt-2 mx-1 bg-gray-200 w-full"
                            maxLength="512"
                            placeholder="Kod pocztowy"
                            required
                        />
                        <input
                            type="text"
                            name="city"
                            value={props.data.city}
                            onChange={props.onChange}
                            className="shadow rounded p-2 mt-2 ml-1 bg-gray-200 w-full"
                            maxLength="512"
                            placeholder="Miasto"
                            required
                        />
                    </div>
                    <div className="flex">
                        <input
                            type="email"
                            name="recipint_email"
                            value={props.data.recipint_email}
                            onChange={props.onChange}
                            className="shadow rounded p-2 mt-2 mr-1 bg-gray-200 w-full"
                            placeholder="Email odbiorcy"
                            maxLength="128"
                        />
                        <input
                            type="phone"
                            name="recipint_phone_number"
                            value={props.data.recipint_phone_number}
                            onChange={props.onChange}
                            className="shadow rounded p-2 mt-2 ml-1 bg-gray-200 w-full"
                            placeholder="Telefon odbiorcy"
                            maxLength="16"
                        />
                    </div>
                    <div className="flex">
                        <div className="w-3/5 mt-3">
                            <Switch
                                on="1"
                                off=""
                                value={props.data.on_delivery}
                                styles={{
                                    track: {
                                        width: '40px',
                                        height: '20px'
                                    },
                                    trackChecked: {
                                        background: '#af54ff'
                                    },
                                    button: {
                                        width: '16px',
                                        height: '16px'
                                    },
                                    buttonChecked: {
                                        background: '#6f0ac7',
                                        marginLeft: '10px'
                                    }
                                }}
                                onChange={e => props.onChange({
                                    target: {
                                        name: 'on_delivery',
                                        value: e
                                    }
                                })}
                            />
                            <span className="ml-4 text-dark">Za pobraniem</span>
                        </div>
                        <input
                            type="text"
                            name="courier_name"
                            value={props.data.courier_name}
                            onChange={props.onChange}
                            className="shadow rounded p-2 mt-2 bg-gray-200 w-full"
                            maxLength="128"
                            placeholder="Nazwa kuriera"
                            required
                        />
                    </div>
                    {props.data.on_delivery &&
                        <input
                            type="text"
                            name="account_number"
                            value={props.data.account_number}
                            onChange={props.onChange}
                            className="shadow rounded p-2 mt-2 bg-gray-200 w-full"
                            maxLength="128"
                            placeholder="Nr konta"
                            required
                        />
                    }
                </div>
                <button
                    type="submit"
                    className="w-full p-3 rounded-xl mt-3 bg-purple-600 text-2xl text-purple-400"
                >
                    <b>Nadaj</b>
                </button>
            </div>
        </form>
    )
}

export default AddNew;