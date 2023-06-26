import React, { useEffect, useState } from 'react';
import AdminService from '../../../Services/User.service';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PastEvents from '../PastEvents/PastEvents.components';
import UpcomingEvents from '../UpcomingEvents/UpcomingEvents.components';
import Booking from '../../../Interfaces/Booking.interface';

const TabComponent = () => {
	const [value, setValue] = React.useState('2');
	const [bookings, setBookings] = useState<Booking[]>([]);
	const today = new Date().toISOString();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await AdminService.bookingsList();
				console.log(result);
				setBookings(result);
			} catch (error) {
				// Handle error
				console.log(error);
			}
		};

		fetchData();
	}, []);

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		event.preventDefault();
		setValue(newValue);
	};

	const filterBookings = (booking: Booking) => {
		const bookingTime = new Date(booking.date).toISOString();
		return bookingTime >= today;
	};
	const pastBookings = bookings.filter((booking) => !filterBookings(booking));
	const upComingBookings = bookings.filter(filterBookings);

	return (
		<div>
			<Box sx={{ width: '100%', typography: 'body1', marginTop: '' }}>
				<TabContext value={value}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<TabList
							onChange={handleChange}
							aria-label="lab API tabs example">
							<Tab
								label="Past"
								value="1"
							/>
							<Tab
								label="Upcoming"
								value="2"
							/>
						</TabList>
					</Box>
					<TabPanel value="1">
						<div className="">
							{pastBookings.map((booking: Booking) => (
								<PastEvents
									key={booking._id}
									booking={booking}
								/>
							))}
						</div>
					</TabPanel>
					<TabPanel value="2">
						<div className="">
							{upComingBookings.map((booking: Booking) => (
								<UpcomingEvents
									key={booking._id}
									booking={booking}
								/>
							))}
						</div>
					</TabPanel>
				</TabContext>
			</Box>
		</div>
	);
};

export default TabComponent;
