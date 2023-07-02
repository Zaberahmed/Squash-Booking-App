import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './Pages/Landing.page';
import SignUpPage from './Pages/SignUp.page';
import SignInPage from './Pages/SignIn.page';
import UserPage from './Pages/User.page';
import LottiePlayer from './Components/Lottie/LottiePlayer.component';
import Profile from './Components/User Components/Profile/Profile.component';
import Upcoming from './Components/User Components/Upcoming/Upcoming.component';
import AdminPage from './Pages/Admin.page';
import SelectPerson from './Components/User Components/SelectPerson/SelectPerson.component';
import EventPage from './Components/Admin Components/EventPage/EventPage.component';
import SimpleCalender from './Components/User Components/Calender/Calender.component';
import TabComponent from './Components/Admin Components/Tab/Tab.component';
import History from './Components/User Components/History/History.component';

import auth from './utils/authentication';
import MembersList from './Components/Admin Components/MembersList/MembersList.component';
import TimeSlotsList from './Components/User Components/TimeSlotList/TimeSlotList.component';
import AdminTimeSlots from './Components/Admin Components/AdminTimeSlots/AdminTimeSlots.component';

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
					path="timeslotlist"
					element={<TimeSlotsList />}></Route>
				<Route
					path="/selectperson"
					element={<SelectPerson />}></Route>

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
					path="admin/timeslots"
					element={<AdminTimeSlots />}></Route>

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
