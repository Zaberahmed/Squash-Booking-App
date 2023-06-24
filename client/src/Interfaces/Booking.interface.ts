export default interface Booking {
	_id?: string;
	user: string;
	date: Date;
	slot: Object;
	peer?: [Object];
}
