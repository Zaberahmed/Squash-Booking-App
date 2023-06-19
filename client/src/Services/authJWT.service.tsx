const BASE_URL = 'http://localhost:3001';
import User from '../Interfaces/User.interface';

let authJWT: Object = {
	register: async function () {},
};

interface RegisterResponse {
	// Define the properties of the response object
	// based on your actual API response structure
	success: boolean;
	message: string;
}

authJWT = {
	register: async (user: User): Promise<RegisterResponse> => {
		return await fetch(`${BASE_URL}/register`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));
	},
};

export default authJWT;
