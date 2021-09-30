import React from 'react';

class Header extends React.Component {
    render = () => {
        return(
            <header>
                <div className="bg-gray-700 text-gray-400 p-4">
                    <h1 className="text-5xl ml-64">
                        <i className="fas fa-boxes mr-3 text-purple-500"></i>
                        <b>Silc<span className="text-purple-500">P</span>ost</b>
                    </h1>
                </div>
            </header>
        )
    }
}

export default Header;
