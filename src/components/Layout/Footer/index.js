import React from 'react';


const Footer = () => {
    return(
        <footer className="text-center py-3 bg-gray-700">
            <i className="fas fa-boxes text-5xl text-gray-500 pt-5"></i>
            <div className="mt-5 mb-3 text-gray-500">
                &copy; Silcare {new Date().getFullYear()}
            </div>
        </footer>
    )
}

export default Footer;
