const BASE_URL = 'http://localhost:4000';
// import User from '../Interfaces/User.interface';

let AdminJWT: any = {
	register: async function () {},
	login: async function () {},
};

interface RegisterResponse {
	success: boolean;
	message: string;
}

const token: string | null = localStorage.getItem('accessToken');

AdminJWT = {
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
	logout: async (admin: any): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/admin/logout`, {
			method: 'GET',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
			body: JSON.stringify(admin),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},

	bookingLists: async (): Promise<RegisterResponse> => {
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
	//single booking
	getBooking: async (bookingId: string): Promise<RegisterResponse> => {
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
	membersList: async (): Promise<RegisterResponse> => {
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
	//single memeber
	getUser: async (userId: string): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/admin/member`, {
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
	//service to delete a booking

	//service to delete an user
	// servide to post an event
	//service to get all events
};

export default AdminJWT;
