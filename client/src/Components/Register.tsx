import { useState, ChangeEvent, FormEvent } from 'react';
import auth from '../utils/auth';
// import authJWT from '../Services/authJWT.service';
import { useNavigate } from 'react-router-dom';
import User from '../Interfaces/User.interface';
import '../App.css';

const initialState: User = {
  name: '',
  membershipId: '',
  phone: '',
  email: '',
  password: '',
};
interface Props {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Register = (props: Props) => {
  const navigate = useNavigate();
  const [state, setState] = useState<User>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData: FormData = new FormData(form);

    const user = Object.fromEntries(formData);
    console.log(user);
    // const registerData = await authJWT.register(user);
    // const loginData = await authJWT.login(user);
    // if (registerData && loginData) {
    // 	localStorage.setItem('accessToken', loginData.accessToken);
    // 	props.setIsAuthenticated(true);
    // 	auth.login(() => navigate('/profile'));
    // }
    props.setIsAuthenticated(true);
    auth.login(() => navigate('/profile'));
  };

  const validateForm = (): boolean => {
    return (
      !state.name ||
      !state.membershipId ||
      !state.phone ||
      !state.email ||
      !state.password
    );
  };

  return (
    <div>
      <h2>Register</h2>
      <body>
        <form onSubmit={handleSubmit}>
          <div className='container'>
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr />

            <label htmlFor='name'>
              <b>Name</b>
            </label>
            <input
              type='text'
              placeholder='Enter Your Name'
              name='name'
              value={state.name}
              onChange={handleChange}
            />
            <label htmlFor='membershipId'>
              <b>Membership ID</b>
            </label>
            <input
              type='membershipId'
              placeholder='Membership ID'
              name='membershipId'
              value={state.membershipId}
              onChange={handleChange}
            />
            <label htmlFor='phone'>
              <b>Mobile Number</b>
            </label>
            <input
              type='phone'
              placeholder='Enter your Mobile Number'
              name='phone'
              value={state.phone}
              onChange={handleChange}
            />

            <label htmlFor='email'>
              <b>Email</b>
            </label>
            <input
              type='email'
              placeholder='Enter Email'
              name='email'
              value={state.email}
              onChange={handleChange}
            />

            <label htmlFor='password'>
              <b>Password</b>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              name='password'
              value={state.password}
              onChange={handleChange}
            />

            <hr />

            <button
              type='submit'
              className='registerbtn'
              disabled={validateForm()}
            >
              Register
            </button>
          </div>

          {/* <div className='container signin'>
          <p>
            Already have an account? <a href='#'>Sign in</a>.
          </p>
        </div> */}
        </form>
      </body>
    </div>
  );
};

export default Register;
