const BASE_URL = 'http://localhost:4000';
import User from '../Interfaces/User.interface';

let authJWT: any = {
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

authJWT = {
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

	userSlotsAvailability: async (date: Object): Promise<RegisterResponse> => {
		console.log(date);
		return await fetch(`${BASE_URL}/available`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
			body: JSON.stringify(date),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},

	userBooking: async (booking: Object): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/confirm`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
			body: JSON.stringify(booking),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
	userProfile: async (): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/profile`, {
			method: 'GET',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
	userHistory: async (date: Object): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/previous`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
			body: JSON.stringify(date),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
	userUpcoming: async (date: Object): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/upcomming`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
			body: JSON.stringify(date),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
	getAllUsers: async (): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/members`, {
			method: 'GET',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
};

export default authJWT;
