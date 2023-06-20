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
	userBooking: async (date: Date): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/login`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
			body: JSON.stringify(date),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
	userProfile: async (id: string): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/profile`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
			body: JSON.stringify(id),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
	userHistory: async (id: string): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/login`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
			body: JSON.stringify(id),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
	userUpcoming: async (id: string): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/upcoming`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
			body: JSON.stringify(id),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
};

export default authJWT;
