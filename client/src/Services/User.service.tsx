const BASE_URL = 'http://localhost:4000';
import User from '../Interfaces/User.interface';

let User: any = {
	register: async function () {},
	login: async function () {},
};

interface RegisterResponse {
	// Define the properties of the response object
	// based on your actual API response structure
	success: boolean;
	message: string;
}

const token: string | null = localStorage.getItem('accessToken');

User = {
	//registration of user
	register: async (user: User): Promise<RegisterResponse> => {
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
	login: async (user: User): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/login`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},

	//logout

	//service to get all available slots
	availableSlots: async (date: Object): Promise<RegisterResponse> => {
		console.log(date);
		return await fetch(`${BASE_URL}/available`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(date),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
	//service to book a court
	Book: async (booking: Object): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/confirm`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(booking),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
	//service to see profile info
	Profile: async (): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/profile`, {
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
	//service to see all the past bookings
	pastBookings: async (date: Object): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/previous`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(date),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
	//service to see all the upcoming bookkings
	upcomingBookings: async (date: Object): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/upcomming`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(date),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
	//service to cancel an upcoming booking
	cancelBooking: async (bookingId: string): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/cancel`, {
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
	//service to get an user information
	getUser: async (userId: string): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/user`, {
			method: 'GET',
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
};

export default User;
