import Timeslot from './Timeslot.interface';

export default interface Event {
	_id?: string;
	title: string;
	type: string;
	dates?: Date[];
	days?: Number[];
	slots: Timeslot[];
}
