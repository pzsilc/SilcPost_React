import React from 'react';

const NewList = ({ packages }) => {
    return (
        <div className="mt-10 bg-gray-500">
            <h3 className="p-3 text-xl text-gray-400">
                <b>Lista paczek (nowe)</b>
            </h3>
            {packages.length !== 0 &&
                <table className="w-full">
                    <thead>
                        <tr className="text-purple-500 bg-gray-700">
                            <th className="p-2">ID</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Telefon</th>
                            <th className="p-2">Nazwa odbiorcy</th>
                            <th className="p-2">Adres</th>
                            <th className="p-2">pobranie</th>
                            <th className="p-2">Nr konta</th>
                            <th className="p-2">Nazwa kuriera</th>
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
                                <td className="p-2">{p.recipint_email}</td>
                                <td className="p-2">{p.recipint_phone_number}</td>
                                <td className="p-2">{p.recipint_name}</td>
                                <td className="p-2">{p.street} {p.home_number}, {p.city} {p.zip_code}</td>
                                <td className="p-2">{p.on_delivery ? "Tak" : "Nie"}</td>
                                <td className="p-2">{p.account_number}</td>
                                <td className="p-2">{p.courier_name}</td>
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

export default NewList;