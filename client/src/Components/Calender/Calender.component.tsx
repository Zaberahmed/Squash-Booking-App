import Calendar from 'react-calendar';
import './Calender.component.css';
import { useState } from 'react';

function Calender() {
	const [value, setValue] = useState<any>(new Date());

	return (
		<Calendar
			value={value}
			onChange={setValue}
		/>
	);
}
export default Calender;
