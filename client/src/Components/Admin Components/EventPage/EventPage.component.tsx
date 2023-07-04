import AdminCalender from '../AdminCalender/AdminCalender.component';
import AdminUpcoming from '../AdminUpcomingEvents/AdminUpcoming.component';
import RecurringEvent from '../RecurringEvent/AdminRecurringEvent.component';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { Link } from 'react-router-dom';

const EventPage = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div>
			<div>
				<Button
					id="fade-button"
					aria-controls={open ? 'fade-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}>
					Dashboard
				</Button>
				<Menu
					id="fade-menu"
					MenuListProps={{
						'aria-labelledby': 'fade-button',
					}}
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					TransitionComponent={Fade}>
					<MenuItem onClick={handleClose}>
						<Link to="special-event">Special Event</Link>
					</MenuItem>
					<MenuItem onClick={handleClose}>
						<Link to="recurring-event">Recurring Event</Link>
					</MenuItem>
					<MenuItem onClick={handleClose}>Logout</MenuItem>
				</Menu>
			</div>
		</div>
	);
};

export default EventPage;
