import Booking from '../../../Interfaces/Booking.interface';
import './UpcomingEvents.component.css';

interface Props {
	key?: string;
	booking: Booking;
}
const UpcomingEvents = (props: Props) => {
	// console.log(booking);
	return (
		<div className="">
			<h1>Upcoming Events</h1>
			<div className="cards">
				<div className="card">
					<h3 className="">
						<strong>Date:</strong>
					</h3>
					<h3>slotName:{props.booking.slot.slotName}</h3>
					<h3>slotTime:{props.booking.slot.time}</h3>
					<h3 className="">
						<strong>Court Number:</strong>
					</h3>
					<h3 className="">
						<strong>Main Player:</strong>
					</h3>
					<h3 className="">
						<strong>Partner Player:</strong>
					</h3>
					<a
						href="#"
						className="btn"
						style={{ color: 'red' }}>
						Cancel
					</a>
				</div>
			</div>
		</div>
	);
};

export default UpcomingEvents;
