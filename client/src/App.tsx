<<<<<<< HEAD
import Calender from './Components/Calender/Calender.component';
import TimePicker from './Components/TimePicker/TimePicker.component';
import './App.css';

function App() {
	return (
		<div className='App'>
			<Calender />
			<TimePicker />
		</div>
	);
}
=======
import { BrowserRouter as Router } from 'react-router-dom';
import auth from './utils/auth';
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Navbar';
import React from 'react';

import './App.css';

const App = () => {
	const initialState = auth.isAuthenticated();
	const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(initialState);
	return (
		<div>
			<Router>
				<Navbar isAuthenticated={isAuthenticated} />
				<Dashboard setIsAuthenticated={setIsAuthenticated} />
			</Router>
		</div>
	);
};
>>>>>>> my-work

export default App;
