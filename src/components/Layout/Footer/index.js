import React from 'react';


const Footer = () => {
    let year = new Date().getFullYear();
    return(
        <footer className="text-center bg-gray-900 py-4 mt-10 text-gray-700 font-bold flex justify-around">
            <div>
                <img 
                    src="/pink-logo.png" 
                    alt="Pink Logo"
                    width="150"
                />
            </div>
            <div className="mt-5">
                Copyright &copy; {year}
            </div>
        </footer>
    )
}

export default Footer;