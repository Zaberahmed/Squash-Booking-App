const BASE_URL = 'http://localhost:4000';
import User from '../Interfaces/User.interface';

let AdminService: any = {
	register: async function () {},
	login: async function () {},
};

interface RegisterResponse {
	success: boolean;
	message: string;
}

const token: string | null = localStorage.getItem('accessToken');

AdminService = {
	//service to register a user
	registerUser: async (user: User): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/registration`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
	//login
	login: async (admin: any): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/admin/login`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(admin),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
	//logout
	logout: async (): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/admin/logout`, {
			method: 'GET',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
	//service to get all bookings
	getBookings: async (): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/admin/bookings`, {
			method: 'GET',
			credentials: 'include',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
	//service to get a single booking
	getBooking: async (bookingId: Object): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/admin/booking`, {
			method: 'GET',
			credentials: 'include',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(bookingId),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
	//Service to get all members
	getMembers: async (): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/admin/members`, {
			method: 'GET',
			credentials: 'include',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
	//service to get a single memeber
	getMember: async (userId: Object): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/admin/member`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(userId),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
	//service to delete a booking
	removeBooking: async (bookingId: Object): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/admin/delete-booking`, {
			method: 'DELETE',
			credentials: 'include',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(bookingId),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
	//service to delete an user
	removeMember: async (userId: Object): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/admin/delete-member`, {
			method: 'DELETE',
			credentials: 'include',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(userId),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
	// service to post an event
	createEvent: async (event: Event): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/admin/event`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(event),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
	//service to get all events
	getEvents: async (): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/admin/all-events`, {
			method: 'GET',
			credentials: 'include',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
	//service to delete an event
	removeEvent: async (eventId: Object): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/admin/delete-event`, {
			method: 'DELETE',
			credentials: 'include',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(eventId),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
};

export default AdminService;
