import peer from './Peer.interface';
import Timeslot from './Timeslot.interface';

export default interface Booking {
	_id?: string;
	user: string;
	date: Date;
	slot: Timeslot;
	peer?: [peer];
}
