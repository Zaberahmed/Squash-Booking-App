import { useEffect, useState } from 'react';
import AdminService from '../../../Services/Admin.service';
import Event from '../../../Interfaces/Event.interface';
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

const AdminUpcoming = () => {
	const [events, setEvents] = useState<Event[]>([]);
	const [open, setOpen] = useState<boolean>(false);
	const [eventIdToDelete, setEventIdToDelete] = useState<string>('');
	const [eventDate, setEventDate] = useState<Date>(new Date());
	const [ableToCancel, setAbleToCancel] = useState<boolean>(true);

	const handleOpen = (eventId: string, eventDate: Date) => {
		setOpen(true);
		setEventIdToDelete(eventId);
		setEventDate(eventDate);
	};
	const handleClose = () => setOpen(false);

	const hasEventPassed = (event: Event): boolean => {
		if (event.dates && event.dates.length > 0) {
			const lastDate = event.dates[event.dates.length - 1];
			const currentDate = new Date();
			return new Date(lastDate) < currentDate;
		}
		return false;
	};

	const handleDelete = async () => {
		console.log('Delete button has been pressed');
		const currentTime = new Date();
		const eventTime = new Date(eventDate);
		// Calculate the time difference in milliseconds
		const timeDifference = eventTime.getTime() - currentTime.getTime();
		// Calculate the time difference in hours
		const timeDifferenceInHours = timeDifference / (1000 * 60 * 60);
		if (timeDifferenceInHours < 3) {
			// Show an error message to the user or perform appropriate action
			setAbleToCancel(false);
			return;
		}
		try {
			await AdminService.removeEvent({ _id: eventIdToDelete });
			// console.log(result);
			setEvents((previousState) => previousState?.filter((eventItem) => eventItem._id !== eventIdToDelete));
			handleClose();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const results = await AdminService.getEvents();

				setEvents(results);
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
			{events.map((event) => (
				<div
					className="text-center"
					key={event._id}>
					<p>{event.title}</p>
					<p>{event.type}</p>
					{event.type === 'special event' && event.dates && event.dates.length >= 2 ? (
						<div>
							<p>
								Start Date:{' '}
								{new Date(event.dates[0]).toLocaleDateString('en-US', {
									weekday: 'long',
									day: 'numeric',
									month: 'long',
									year: 'numeric',
								})}
							</p>
							<p>
								End Date:{' '}
								{new Date(event.dates[event.dates.length - 1]).toLocaleDateString('en-US', {
									weekday: 'long',
									day: 'numeric',
									month: 'long',
									year: 'numeric',
								})}
							</p>
							<section>
								Slots occupied:{' '}
								{event.slots.map((slot) => (
									<p key={slot.slotName}>{slot.time}</p>
								))}
							</section>
							{hasEventPassed(event) ? (
								'Event has passed'
							) : (
								<button
									className="bg-red-500 rounded"
									onClick={() => {
										event._id && event.dates && handleOpen(event._id, event.dates[0]);
									}}>
									Delete
								</button>
							)}
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
					) : (
						<p>Logic for recurring event</p>
					)}
				</div>
			))}
		</div>
	);
};

export default AdminUpcoming;
