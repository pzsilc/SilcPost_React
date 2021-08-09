import React from 'react';
import { Link } from "react-router-dom";
import './style.css';

const Home = props => {
	return(
		<div className="-pb-24">
			<div 
				id="home-background"
				style={{ 
					backgroundImage: "url('home-background.png')" 
				}}
			>
			</div>
			<div id="introduction">
				<h1 className="sm:ml-10 text-3xl sm:text-5xl text-center sm:text-left text-white">Grafiki dla drogerii</h1>
				<div className="text-center">
					<Link 
						to="/login"
						className="bg-green-700 py-4 px-16 text-2xl rounded-3xl shadow-xl"
						style={{ 
							fontFamily: 'Fredoka One, cursive', 
							letterSpacing: '2px' 
						}}
					>
						<b>LOGOWANIE</b>
					</Link>
				</div>
			</div>
			<div>
				<h1 
					className="absolute text-5xl p-10 text-green-700" 
					style={{zIndex:'10000'}}
				>Kroki</h1>
				<div
					className="bg-green-500" 
					style={{ clipPath: 'polygon(0 0, 50% 0, 39% 100%, 0% 100%)', height: '600px' }}
				>
				</div>
				<div id="steps">
					<div className="absolute shadow-xl flex justify-between bg-white rounded-xl">
						<div className="bg-green-600 text-white p-6 text-5xl rounded-l-xl">
							<i className="fa fa-sign-in"></i>
						</div>
						<div className="bg-white rounded-r-xl p-3 text-xl pt-8">
							Administrator loguje się do systemu
						</div>
					</div>
					<div className="absolute shadow-xl flex justify-between bg-white rounded-xl">
						<div className="bg-green-600 text-white p-6 text-5xl rounded-l-xl">
							<i className="fa fa-plus"></i>
						</div>
						<div className="bg-white rounded-r-xl p-3 text-xl pt-8">
							Administrator dodaje nowy grafik dla drogerii
						</div>
					</div>
					<div className="absolute shadow-xl flex justify-between bg-white rounded-xl">
						<div className="bg-green-600 text-white p-6 text-5xl rounded-l-xl">
							<i className="fa fa-eye"></i>
						</div>
						<div className="bg-white rounded-r-xl p-3 text-xl pt-8">
							Pracownicy drogerii mogą zobaczyć grafik
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home;