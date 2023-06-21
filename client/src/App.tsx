import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/Landing.page';
import React from 'react';
import auth from './utils/auth';
import SignUpPage from './Pages/SignUp.page';
import './App.css';
import SignInPage from './Pages/SignIn.page';
import UserPage from './Pages/User.page';
import LottiePlayer from './Components/Lottie/LottiePlayer.component';

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
							<LottiePlayer />
						</>
					}></Route>
				<Route
					path="/landing"
					element={<LandingPage />}></Route>
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
						<SignInPage
							setIsAuthenticated={setIsAuthenticated}
							isAuthenticated={isAuthenticated}
						/>
					}></Route>

				<Route
					path="/user"
					element={<UserPage />}></Route>
			</Routes>

			{/* <Navbar isAuthenticated={isAuthenticated} />
				<Dashboard setIsAuthenticated={setIsAuthenticated} /> Don't delete this two. I need them for authentication*/}
		</Router>
	);
}

export default App;
