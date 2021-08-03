import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import '../style.css';

const StepsList = () => {
    return(
        <div>
            <div className="bg-green-400 p-10 px-4 md:px-36 m-0" style={{ marginTop: '-25px' }}>
                <h1 className="text-5xl text-white ml-10 mt-10" style={{ fontFamily: 'Fredoka One' }}>Reklamacje</h1>
                <p className="m-10 md:m-10 text-gray-100">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lorem nibh, eleifend non eros sit amet, porttitor volutpat odio. 
                    Donec a nunc cursus, gravida arcu quis, ullamcorper felis. Aenean pulvinar bibendum tellus eu commodo. Nunc turpis sem, volutpat id turpis consectetur, 
                    tempus tincidunt purus. Mauris semper nec enim in pretium. Nulla volutpat felis vel augue tincidunt, ac congue libero maximus. Aliquam sagittis 
                    varius dignissim. Nulla feugiat massa quis urna posuere tempus. In maximus placerat est sed placerat.
                    Curabitur interdum faucibus turpis, ut bibendum tortor dapibus at. Nam lobortis nunc sem, porttitor congue leo bibendum id. 
                    Integer at diam risus. Mauris ullamcorper in elit et congue. Duis a egestas nibh. Maecenas ac enim molestie, eleifend turpis et, sagittis ante. 
                    Nullam in justo odio. Nam vel consectetur sem, id fermentum ex. Donec non mi in nunc cursus pharetra. Nulla facilisi.
                </p>
            </div>
            <div style={{
                height: '0',
                width: '0',
                borderBottom: '200px solid transparent',
                borderRight: '0px solid transparent',
                borderLeft: 'calc(100vw - 17px) solid rgb(52, 211, 153)'
            }}></div>
            <div>
                <div className="hidden md:flex w-2/3 relative mx-auto text-center" style={{ top: '-200px', height: '400px' }}>
                    <div className="bg-white rounded border shadow-xl p-10 w-1/3 m-3 h-full">
                        <b>1. Złóż reklamację</b>
                        <br/>
                        <i className="fa fa-pencil text-9xl mt-20"></i>
                        <div className="text-right mt-10">
                            <i className="fa fa-arrow-right text-gray-300"></i>
                        </div>
                    </div>
                    <div className="bg-white rounded border shadow-xl p-10 w-1/3 m-3 h-full">
                        <b>2. Poczekaj na akceptację</b>
                        <br/>
                        <i className="fa fa-check text-9xl mt-20"></i>
                        <div className="text-right mt-10">
                            <i className="fa fa-arrow-right text-gray-300"></i>
                        </div>                    
                    </div>
                    <div className="bg-white rounded border shadow-xl p-10 w-1/3 m-3 h-full">
                        <b>3. Odbierz hajs</b>
                        <br/>
                        <i className="fa fa-credit-card text-9xl mt-20"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepsList;