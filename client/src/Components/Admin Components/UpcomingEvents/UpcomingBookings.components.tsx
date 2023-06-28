import { Button, Modal, Box, Typography } from '@mui/material';
import Booking from '../../../Interfaces/Booking.interface';
import './UpcomingBookings.component.css';
import { useEffect, useState } from 'react';
import AdminService from '../../../Services/Admin.service';

interface Props {
	key?: string;
	booking: Booking;
	upcomingBookings: Booking[];
	setUpcomingBookings: (bookings: Booking[]) => void;
}
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
const UpcomingBookings = (props: Props) => {
	const [open, setOpen] = useState<boolean>(false);
	const [bookingIdToDelete, setBookingIdToDelete] = useState<string>('');
	const [bookingDate, setBookingDate] = useState<Date>(new Date());
	const [ableToCancel, setAbleToCancel] = useState<boolean>(true);
	const [userName, setUserName] = useState<string>('');
	const [partnerName, setPartnerName] = useState<string>('');

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
		console.log('Delete button has been pressed');
		const currentTime = new Date();
		const bookingTime = new Date(bookingDate);

		// Calculate the time difference in milliseconds
		const timeDifference = bookingTime.getTime() - currentTime.getTime();

		// Calculate the time difference in hours
		const timeDifferenceInHours = timeDifference / (1000 * 60 * 60);

		if (timeDifferenceInHours < 3) {
			// Show an error message to the user or perform appropriate action
			setAbleToCancel(false);
			return;
		}
		try {
			await AdminService.removeBooking({ _id: bookingIdToDelete });
			// console.log(result);
			const updatedBookings = props.upcomingBookings.filter((booking) => booking._id !== bookingIdToDelete);

			props.setUpcomingBookings(updatedBookings);

			handleClose();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userId = props.booking.user;
				const partnerId = props.booking.peer?.[0]?.opponent;
				const userResult = await AdminService.getMember({ _id: userId });
				const partnerResult = await AdminService.getMember({ _id: partnerId });
				console.log(userResult.name);
				console.log(partnerResult.name);
				setUserName(userResult.name);
				setPartnerName(partnerResult.name);
			} catch (error) {
				// Handle error
				console.log(error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="">
			<h1>Upcoming Events</h1>
			<div className="cards">
				<div className="card">
					<p>slotName:{props.booking.slot.slotName}</p>
					<p>slotTime:{formatTime(props.booking.slot.time)}</p>
					<p>
						Date:
						{new Date(props.booking.date).toLocaleDateString('en-US', {
							weekday: 'long',
							day: 'numeric',
							month: 'long',
							year: 'numeric',
						})}
					</p>
					<p className="">
						<strong>Main Player:</strong>
						{userName}
					</p>
					<p className="">
						<strong>Partner Player:</strong>
						{partnerName}
					</p>
					<Button
						onClick={() => {
							props.booking._id && handleOpen(props.booking._id, props.booking.date);
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
								{ableToCancel ? 'Press confirm your choice' : 'Cancellation is not allowed within 3 hours'}
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
			</div>
		</div>
	);
};

export default UpcomingBookings;
