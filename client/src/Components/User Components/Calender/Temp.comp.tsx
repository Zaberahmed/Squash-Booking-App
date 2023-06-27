import { useEffect, useState } from 'react';
import './Upcoming.component.css';
import UserService from '../../../Services/User.service';
import Booking from '../../../Interfaces/Booking.interface';
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
	const [open, setOpen] = useState<boolean>(false);
	const [bookingIdToDelete, setBookingIdToDelete] = useState<string>('');
	const [bookingDate, setBookingDate] = useState<Date>(new Date());
	const [ableToCancel, setAbleToCancel] = useState<boolean>(true);
	const [upcomings, setUpcomings] = useState<any[]>();

	const handleOpen = (bookingId: string, bookingDate: Date) => {
		setOpen(true);
		setBookingIdToDelete(bookingId);
		setBookingDate(bookingDate);
	};
	const handleClose = () => setOpen(false);

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

	const handleDelete = async () => {
		// console.log('Delete button has been pressed');
		const currentTime = new Date();
		const bookingTime = new Date(bookingDate);

		// Calculate the time difference in milliseconds
		const timeDifference = bookingTime.getTime() - currentTime.getTime();

		// Calculate the time difference in hours
		const timeDifferenceInHours = timeDifference / (1000 * 60 * 60);

		if (timeDifferenceInHours < 12) {
			// Show an error message to the user or perform appropriate action
			setAbleToCancel(false);
			return;
		}
		try {
			await UserService.cancelBooking({ _id: bookingIdToDelete });
			// console.log(result);
			setUpcomings((previousState) => previousState?.filter((booking) => booking._id !== bookingIdToDelete));

			handleClose();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const results = await UserService.upcomingBookings({ date: new Date() });
				results.sort((a: Booking, b: Booking) => new Date(a.date).getTime() - new Date(b.date).getTime());
				// console.log(results[0].peer[0].opponent);
				const modifiedResult = await Promise.all(
					results.map(async (result: Booking) => {
						const opponentId = result.peer?.[0]?.opponent;
						// console.log(opponentId);
						const opponent = await UserService.getUser({ _id: opponentId });
						// console.log(opponent);
						if (result.peer && result.peer[0]) {
							result.peer[0].opponentName = opponent.name;
						}
						return result;
					})
				);
				// console.log(modifiedResult);
				setUpcomings(modifiedResult);
				console.log(results);
			} catch (error) {
				// Handle error
				console.log(error);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			{upcomings?.map((upcoming) => (
				<div className="font-bold  text-white">
					<h1 className="primary pt-7 rounded-t-lg mb-7 text-center text-2xl pb-4 font-large">Upcoming Events</h1>
					<div className="overflow-y-scroll ">
						<div className="primary p-4 rounded flex justify-between">
							<p className="p-1">
								{new Date(upcoming.date).toLocaleDateString('en-US', {
									weekday: 'long',
									day: 'numeric',
									month: 'long',
									year: 'numeric',
								})}
							</p>

							<p className="secondary p-1 rounded text-black ">{formatTime(upcoming.slot.time)}</p>
						</div>
					</div>
					<Button
						onClick={() => {
							upcoming._id && handleOpen(upcoming._id, upcoming.date);
						}}
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
								{ableToCancel ? 'Press confirm your choice' : 'Cancellation is not allowed within 12 hours'}
							</Typography>
							<Typography
								id="modal-modal-description"
								sx={{ mt: 2 }}>
								<Button
									onClick={handleDelete}
									color="error"
									sx={{ float: 'right' }}>
									OKAY
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
