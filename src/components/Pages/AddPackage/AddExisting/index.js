import React from 'react';

const AddExisting = props => {
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
                            className="w-1/2 mr-1 shadow rounded p-2 mt-2 bg-gray-200"
                            placeholder="Nr zamówienia"
                            onChange={props.onChange}
                            name="order_number"
                            value={props.data.order_number}
                            required
                        />
                        <input
                            type="text"
                            className="w-1/2 ml-1 shadow rounded p-2 mt-2 bg-gray-200"
                            placeholder="Nazwa klienta"
                            onChange={props.onChange}
                            name="client_name"
                            value={props.data.client_name}
                            required
                        />
                    </div>
                    <input
                        type="text"
                        className="shadow rounded p-2 mt-2 bg-gray-200 w-full"
                        placeholder="Gdzie się paczka znajduje"
                        onChange={props.onChange}
                        name="where_is_package"
                        value={props.data.where_is_package}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full p-3 rounded-xl mt-3 bg-purple-600 text-2xl text-purple-400"
                >
                    <b>Dołóż</b>
                </button>
            </div>
        </form>
    )
}

export default AddExisting;