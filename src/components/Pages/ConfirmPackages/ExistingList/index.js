import React from 'react';

const ExistingList = ({ packages }) => {
    return (
        <div className="mt-10 bg-gray-500">
            <h3 className="p-3 text-xl text-gray-400">
                <b>Lista paczek (dołożone)</b>
            </h3>
            {packages.length !== 0 &&
                <table className="w-full">
                    <thead>
                        <tr className="text-purple-500 bg-gray-700">
                            <th className="p-2">ID</th>
                            <th className="p-2">Nr zamówienia</th>
                            <th className="p-2">Nazwa klienta</th>
                            <th className="p-2">Gdzie jest paczka?</th>
                            <th className="p-2">Data dodania</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages.map((p, key) => 
                            <tr 
                                key={key}
                                className={`bg-gray-${key % 2 === 0 ? '400' : '500'}`}
                            >
                                <td className="p-2">{p.id}</td>
                                <td className="p-2">{p.order_number}</td>
                                <td className="p-2">{p.client_name}</td>
                                <td className="p-2">{p.where_is_package}</td>
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
    )
}

export default ExistingList;