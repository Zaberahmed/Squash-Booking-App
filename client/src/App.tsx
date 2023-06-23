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
import MemberLists from './Components/MemberLists/MemberLists';
import History from './Components/History/History';
import SelectPerson from './Components/SelectPerson/SelectPerson';

import EventPage from './Components/AdminPanel/EventPage';

function App() {
  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialState);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LottiePlayer />}></Route>
        <Route path='/landing' element={<LandingPage />}></Route>
        <Route
          path='/register'
          element={
            <SignUpPage
              setIsAuthenticated={setIsAuthenticated}
              isAuthenticated={isAuthenticated}
            />
          }
        ></Route>
        <Route
          path='/login'
          element={
            <SignInPage
              setIsAuthenticated={setIsAuthenticated}
              isAuthenticated={isAuthenticated}
            />
          }
        ></Route>

        <Route path='/user/*' element={<UserPage />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/history' element={<History />}></Route>
        <Route path='/upcoming' element={<Upcoming />}></Route>
        <Route
          path='/selectperson'
          element={
            <SelectPerson
              selectedTime={'its not working'}
              selectedDate={new Date()}
            />
          }
        />
        <Route path='/admin' element={<AdminPage />}></Route>
        <Route path='/event' element={<EventPage />}></Route>
        <Route path='/lists' element={<MemberLists />}></Route>
        <Route path='/bookings' element={<BookingLists />}></Route>
      </Routes>

      {/* <Navbar isAuthenticated={isAuthenticated} />
				<Dashboard setIsAuthenticated={setIsAuthenticated} /> Don't delete this two. I need them for authentication*/}
    </Router>
  );
}

export default App;
