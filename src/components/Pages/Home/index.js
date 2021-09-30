import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return(
        <div className="flex w-1/2 mx-auto mt-20">
            <Link 
                className="w-1/2 p-10 shadow-xl rounded-3xl py-32 bg-gray-300 m-3 text-center hover:no-underline hover:text-gray-500"
                to="/silcpost/login"
            >
                <h1 className="text-5xl">
                    <i className="fa fa-user mb-5"></i>
                    <br/>
                    Skanuj paczki
                </h1>
            </Link>
            <Link 
                className="w-1/2 p-10 shadow-xl rounded-3xl py-32 bg-gray-300 m-3 text-center hover:no-underline hover:text-gray-500"
                to="/silcpost/add-packages"
            >
                <h1 className="text-5xl">
                    <i className="fa fa-plus mb-5"></i>
                    <br/>
                    Nadaj paczkę
                </h1>
            </Link>
        </div>
    )
}

export default Home;