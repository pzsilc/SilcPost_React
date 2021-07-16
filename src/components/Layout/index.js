import React from 'react';



const Header = () => {
    return(
        <header className="bg-white" style={{ zIndex: '1000000000' }}>
            <nav className="fixed flex items-center justify-between flex-wrap bg-white w-full p-6">
                <div className="flex items-center flex-no-shrink text-white mr-6 lg:ml-24">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        style={{
                            width: '180px'
                        }}
                    />
                </div>
                <div className="block lg:hidden">
                    <button className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
                        <svg className="h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                    </button>
                </div>
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div className="text-sm lg:flex-grow text-gray-800">
                        <a 
                            href="/" 
                            className="block mt-4 lg:inline-block lg:mt-2 text-lg mr-4 text-gray-400"
                        >
                            Dodaj reklamację
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    )
}



const Footer = () => {
    let year = new Date().getFullYear();
    return(
        <footer className="text-center bg-gray-900 py-16 text-gray-700 font-bold">
            Copyright &copy; {year}
        </footer>
    )
}



export {
    Header,
    Footer
}