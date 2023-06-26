import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import LandingPage from './Pages/Landing.page';
import SignUpPage from './Pages/SignUp.page';
import SignInPage from './Pages/SignIn.page';
import UserPage from './Pages/User.page';
import LottiePlayer from './Components/Lottie/LottiePlayer.component';
import Profile from './Components/Profile/Profile.component';
import Upcoming from './Components/Upcoming/Upcoming.component';
import AdminPage from './Pages/Admin.page';
import SelectPerson from './Components/SelectPerson/SelectPerson.component';
import EventPage from './Components/AdminPanel/EventPage.component';
import SimpleCalender from './Components/Calender/Calender.component';
import TabComponent from './Components/Tab/Tab.component';
import History from './Components/History/History.component';
import MembersList from './Components/MembersList/MembersList';
import auth from './utils/auth';

function App() {
	const initialState = auth.isAuthenticated();
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialState);

	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={<LottiePlayer />}></Route>
				<Route
					path="landing"
					element={<LandingPage />}></Route>
				<Route
					path="register"
					element={<SignUpPage />}></Route>
				<Route
					path="login"
					element={
						<SignInPage
							setIsAuthenticated={setIsAuthenticated}
							isAuthenticated={isAuthenticated}
						/>
					}></Route>

				<Route
					path="user"
					element={
						<UserPage
							setIsAuthenticated={setIsAuthenticated}
							isAuthenticated={isAuthenticated}
						/>
					}>
					<Route
						index
						element={<SimpleCalender />}></Route>
					<Route
						path="calender"
						element={<SimpleCalender />}></Route>
					<Route
						path="profile"
						element={
							<Profile
								setIsAuthenticated={setIsAuthenticated}
								isAuthenticated={isAuthenticated}
							/>
						}></Route>
					<Route
						path="history"
						element={<History />}></Route>
					<Route
						path="upcoming"
						element={<Upcoming />}></Route>
				</Route>
				<Route
					path="/selectperson"
					element={<SelectPerson />}
				/>

				<Route
					path="admin"
					element={<AdminPage />}>
					<Route
						index
						element={<EventPage />}></Route>
					<Route
						path="event"
						element={<EventPage />}></Route>
					<Route
						path="members"
						element={<MembersList />}></Route>
					<Route
						path="bookings"
						element={<TabComponent />}></Route>
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
