import React from 'react';


const Footer = () => {
    let year = new Date().getFullYear();
    return(
        <footer className="text-center py-3 text-gray-400" style={{ background: '#1b1b1b' }}>
            <div className="md:flex justify-around w-1/2 mx-auto mb-4">
                <div>
                    <img 
                        src="/logo.png" 
                        alt="Pink Logo"
                        width="100"
                        className="mx-auto mt-5"
                    />
                </div>
                <div className="text-center md:text-left my-10 md:mt-5">
                    <a target="_blank" href="https://nails.silcare.com/">
                        <i className="fa fa-shopping-basket mr-3"></i>
                        Silcare.com
                    </a>
                    <br/>
                    <a href="/">
                        <i className="fa fa-home mr-3"></i>
                        Strona główna
                    </a>
                </div>
                <div className="text-3xl mt-3">
                    <a 
                        target="_blank" 
                        href="" 
                        className="fab fa-facebook m-2 hover:text-green-400"
                    ></a>
                    <a 
                        target="_blank" 
                        href="" 
                        className="fab fa-instagram m-2 hover:text-green-400"
                    ></a>
                    <br/>
                    <a 
                        target="_blank" 
                        href="" 
                        className="fab fa-linkedin-in m-2 hover:text-green-400"
                    ></a>
                    <a 
                        target="_blank" 
                        href="" 
                        className="fab fa-twitter m-2 hover:text-green-400"
                    ></a>
                </div>
            </div>
            <div style={{
                width: '90%',
                height: '0px',
                margin: '0 auto',
                border: 'groove 1px #6b6b6b'
            }}></div>
            <div className="mt-5 mb-3 text-gray-500">
                &copy; Wszelkie prawa zastrzeżone {year}
            </div>
        </footer>
    )
}

export default Footer;