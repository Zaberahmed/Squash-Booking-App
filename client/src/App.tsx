import Calender from './Components/Calender/Calender.component';
import TimePicker from './Components/TimePicker/TimePicker.component';
import { BrowserRouter as Router } from 'react-router-dom';
import auth from './utils/auth';
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Navbar';
import React from 'react';

import './App.css';

function App() {
	const initialState = auth.isAuthenticated();
	const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(initialState);
	return (
		<div className='App'>
			<Calender />
			<TimePicker />
			<Router>
				<Navbar isAuthenticated={isAuthenticated} />
				<Dashboard setIsAuthenticated={setIsAuthenticated} />
			</Router>
		</div>
	);
}

export default App;
