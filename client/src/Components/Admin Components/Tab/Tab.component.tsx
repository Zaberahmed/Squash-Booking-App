import { useEffect, useState } from 'react';
import AdminService from '../../../Services/Admin.service';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PastBookings from '../PastBookings/PastBookings.components';
import UpcomingBookings from '../UpcomingBookings/UpcomingBookings.components';
import Booking from '../../../Interfaces/Booking.interface';

const TabComponent = () => {
	const [value, setValue] = useState<string>('2');
	const [bookings, setBookings] = useState<Booking[]>([]);
	const [pastBookings, setPastBookings] = useState<Booking[]>([]);
	const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);

	const today = new Date().toISOString();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await AdminService.getBookings();
				console.log(result);
				setBookings(result);
			} catch (error) {
				// Handle error
				console.log(error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (bookings.length > 0) {
			const filterBookings = (booking: Booking) => {
				const bookingTime = new Date(booking.date).toISOString();
				return bookingTime >= today;
			};

			setPastBookings(bookings.filter((booking) => !filterBookings(booking)));
			setUpcomingBookings(bookings.filter(filterBookings));
		}
	}, [bookings]);

	const handleChange = async (event: React.SyntheticEvent, newValue: string) => {
		event.preventDefault();
		setValue(newValue);
	};

	return (
		<div>
			<Box sx={{ width: '100%', typography: 'body1', marginTop: '' }}>
				<TabContext value={value}>
					<Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
						<TabList
							onChange={handleChange}
							aria-label="lab API tabs example"
							className="primary rounded-t-full px-7 md:w-full pt-7 pb-3 "
							TabIndicatorProps={{
								style: { backgroundColor: 'white' }, // Change indicator color to white
							}}
							centered>
							<Tab
								label="Past"
								value="1"
								sx={{ color: 'white', '&.Mui-selected': { color: 'white' } }}
							/>
							<Tab
								label="Upcoming"
								value="2"
								sx={{ color: 'white', '&.Mui-selected': { color: 'white' } }}
							/>
						</TabList>
					</Box>
					<TabPanel value="1">
						{pastBookings.map((booking: Booking) => (
							<PastBookings
								key={booking._id}
								booking={booking}
							/>
						))}
					</TabPanel>
					<TabPanel value="2">
						{upcomingBookings.map((booking: Booking) => (
							<UpcomingBookings
								key={booking._id}
								booking={booking}
								upcomingBookings={upcomingBookings}
								setUpcomingBookings={setUpcomingBookings}
							/>
						))}
					</TabPanel>
				</TabContext>
			</Box>
		</div>
	);
};

export default TabComponent;
