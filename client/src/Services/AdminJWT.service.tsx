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
  bookingLists: async (): Promise<RegisterResponse> => {
    return await fetch(`${BASE_URL}/bookings`, {
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

export default AdminJWT;
