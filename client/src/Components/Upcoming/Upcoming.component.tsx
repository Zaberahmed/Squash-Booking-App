import { useEffect, useState } from 'react';
import './Upcoming.component.css';
import UserService from './../../Services/User.service';
import Booking from '../../Interfaces/Booking.interface';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const Upcoming = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [upcomings, setUpcomings] = useState<Booking[]>();
	const formatTime = (timeString: string): string => {
		const time = timeString.toLowerCase();
		const hour = time.substring(0, time.length - 2);
		const period = time.substring(time.length - 2);

		let formattedHour = parseInt(hour, 10);
		if (formattedHour < 10) {
			formattedHour = 0 + formattedHour;
		}

		return `${formattedHour}:00 ${period.toUpperCase()}`;
	};
	useEffect(() => {
		const fetchData = async () => {
			try {
				const results = await UserService.upcomingBookings({ date: new Date() });
				results.sort((a: Booking, b: Booking) => new Date(a.date).getTime() - new Date(b.date).getTime());
				setUpcomings(results);
				console.log(results);
			} catch (error) {
				// Handle error
				console.log(error);
			}
		};

		fetchData();
	}, []);

	const handleDelete = async () => {
		console.log('Delete button has been pressed');
	};
	return (
		<div>
			{upcomings?.map((upcoming) => (
				<div className="upcoming-card">
					<div className="card-content flex justify-center gap-5">
						<div className="accent p-4 rounded">
							<p key={upcoming._id}>
								{new Date(upcoming.date).toLocaleDateString('en-US', {
									weekday: 'long',
									day: 'numeric',
									month: 'long',
									year: 'numeric',
								})}
							</p>
						</div>
						<div className="">
							<p key={upcoming._id}>
								<strong>Time: </strong>
								{formatTime(upcoming.slot.time)}
							</p>
						</div>
					</div>
					<Button
						onClick={handleOpen}
						color="error">
						Cancel
					</Button>
					<Modal
						open={open}
						onClose={handleClose}
						sx={{ '& .MuiBackdrop-root': { backgroundColor: 'transparent' } }}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description">
						<Box sx={style}>
							<Typography
								id="modal-modal-title"
								variant="h6"
								component="h2">
								Press confirm your choice
							</Typography>
							<Typography
								id="modal-modal-description"
								sx={{ mt: 2 }}>
								<Button
									onClick={handleDelete}
									color="error"
									sx={{ float: 'right' }}>
									Confirm
								</Button>
							</Typography>
						</Box>
					</Modal>
				</div>
			))}
		</div>
	);
};

export default Upcoming;
