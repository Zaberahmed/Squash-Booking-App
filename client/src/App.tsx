import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/Landing.page';

import './App.css';
import Register from './Components/Register/Register.component';
import React from 'react';
import auth from './utils/auth';
import Login from './Components/Login/Login.component';
import User from './Pages/User.page'
import TimeSlots from './Components/TimeSlots/TimeSlots';


function App() {
	const initialState = auth.isAuthenticated();
	const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(initialState);
	return (
		<div>
			<Router>
				<Routes>
					<Route path="/" element={<LandingPage />}></Route>
					<Route path="/user" element={<User></User>}></Route>

					<Route
						path="/register"
						element={
							<Register
								setIsAuthenticated={setIsAuthenticated}
								isAuthenticated={isAuthenticated}
							/>
						}></Route>
					<Route
						path="/login"
						element={
							<Login
								setIsAuthenticated={setIsAuthenticated}
								isAuthenticated={isAuthenticated}
							/>
						}></Route>
				</Routes>

				{/* <Navbar isAuthenticated={isAuthenticated} />
				<Dashboard setIsAuthenticated={setIsAuthenticated} /> */}
			</Router>
		</div>
	);
}

export default App;
