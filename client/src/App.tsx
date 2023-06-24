import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/Landing.page';
import { useState } from 'react';
import auth from './utils/auth';
import SignUpPage from './Pages/SignUp.page';
import './App.css';
import SignInPage from './Pages/SignIn.page';
import UserPage from './Pages/User.page';
import LottiePlayer from './Components/Lottie/LottiePlayer.component';
import Profile from './Components/Profile/Profile';
import Upcoming from './Components/Upcoming/Upcoming';
import AdminPage from './Pages/Admin.page';
// import SimpleCalender from './Components/Calender/Calender.component';
import BookingLists from './Components/AdminBookingLists/BookingLists';
import History from './Components/History/History';
import SelectPerson from './Components/SelectPerson/SelectPerson';

import EventPage from './Components/AdminPanel/EventPage';
import SimpleCalender from './Components/Calender/Calender.component';
import MembersList from './Components/MembersList/MembersList';
import TabComponent from './Components/Tab/Tab.component';
import UpcomingEvents from './Components/Upcoming/UpcomingEvents';

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
					element={
						<SignUpPage
							setIsAuthenticated={setIsAuthenticated}
							isAuthenticated={isAuthenticated}
						/>
					}></Route>

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
					{' '}
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
						element={<UpcomingEvents />}></Route>
					<Route
						path="upcomingevents"
						element={<UpcomingEvents />}></Route>
					<Route
						path="event"
						element={<EventPage />}></Route>
					<Route
						path="members"
						element={<MembersList />}></Route>
					<Route
						path="bookings"
						element={<BookingLists />}></Route>
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
