// import auth from './utils/auth';
// import Dashboard from './Components/Dashboard';
// import Navbar from './Components/Navbar';
// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/Landing.page';
import Calender from './Components/Calender/Calender.component'

import './App.css';
import Register from './Components/Register';
import React from 'react';
import auth from './utils/auth';
import Login from './Components/Login';

function App() {
	const initialState = auth.isAuthenticated();
	const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(initialState);
	return (
		<div>
			<Router>
				<Routes>
					<Route
						path="/"
						element={<>
							<LandingPage />
							<Calender></Calender>
						  </>}
						
						></Route>
					<Route
						path="/register"
						element={<Register setIsAuthenticated={setIsAuthenticated} />}></Route>
					<Route
						path="/login"
						element={<Login setIsAuthenticated={setIsAuthenticated} />}></Route>
				</Routes>

				{/* <Navbar isAuthenticated={isAuthenticated} />
				<Dashboard setIsAuthenticated={setIsAuthenticated} /> */}
			</Router>
		</div>
	);
}

export default App;
