const BASE_URL = 'http://localhost:4000';
import User from '../Interfaces/User.interface';

let UserService: any = {
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

UserService = {
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
	logout: async (): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/logout`, {
			method: 'GET',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
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
	bookCourt: async (booking: Object): Promise<RegisterResponse> => {
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
	profile: async (): Promise<RegisterResponse> => {
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
	cancelBooking: async (bookingId: Object): Promise<RegisterResponse> => {
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
	getUser: async (userId: Object): Promise<RegisterResponse> => {
		// console.log(userId);
		return await fetch(`${BASE_URL}/user`, {
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
	//Service to get all user informations
	getUsers: async (): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/users`, {
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
};

export default UserService;
