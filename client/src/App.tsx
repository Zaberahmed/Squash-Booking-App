import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/Landing.page';
import React from 'react';
import auth from './utils/auth';
import Login from './Components/Login/Login.component';
import SignUpPage from './Pages/SignUp.page';
import './App.css';

function App() {
	const initialState = auth.isAuthenticated();
	const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(initialState);
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<>
							<LandingPage />
						</>
					}></Route>
				<Route
					path="/register"
					element={
						<SignUpPage
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
				<Dashboard setIsAuthenticated={setIsAuthenticated} /> Don't delete this two. I need them for authentication*/}
		</Router>
	);
}

export default App;
