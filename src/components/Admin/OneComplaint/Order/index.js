import React from 'react';

const Order = props => {
    return(
        <div className="border border-gray-300 p-5">
            <b className="m-3">Produkty</b>
            <table className="w-full text-center mt-3">
                <thead className="bg-green-500">
                    <tr>
                        <td className="hidden md:block">ID</td>
                        <td>Kod</td>
                        <td className="hidden md:block">Opis</td>
                        <td>Cena</td>
                    </tr>
                </thead>
                <tbody>
                    {props.order.products.map((product, key) => 
                        <tr 
                            key={key}
                            className={key % 2 == 0 ? "bg-green-200" : "bg-green-300"}
                        >
                            <td className="hidden md:block">{product.id}</td>
                            <td>{product.kod}</td>
                            <td className="hidden md:block">{product.opis}</td>
                            <td>{parseFloat(product.cena).toFixed(2)} zł</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Order;