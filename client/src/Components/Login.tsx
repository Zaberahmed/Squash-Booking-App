import { ChangeEvent, FormEvent, useState } from 'react';
import auth from '../utils/auth';
// import authJWT from '../Services/authJWT.service';
import { useNavigate } from 'react-router-dom';

interface Props {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const initialState = {
  email: '',
  password: '',
};

const Login = (props: Props) => {
  let navigate = useNavigate();
  const [state, setState] = useState(initialState);

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
    // const loginData = await apiServiceJWT.login(user);
    // if (loginData) {
    // 	// localStorage.setItem('accessToken', loginData.accessToken);

    // 	props.setIsAuthenticated(true);
    // 	auth.login(() => navigate('/profile'));
    // }
    props.setIsAuthenticated(true);
    auth.login(() => navigate('/profile'));
  };

  const validateForm = () => {
    return !state.email || !state.password;
  };

  return (
    <section>
      <body>
        <form onSubmit={handleSubmit}>
          <div className='container'>
            <h1 className='text-4xl text-center font-sans font-bold tracking-wide'>
              Login
            </h1>
            {/* <p>Please fill in this form to create an account.</p> */}
            <hr />

            <label htmlFor='email'>
              <b className='font-mono'>Email</b>
            </label>
            <input
              type='email'
              placeholder='example@example.com'
              name='email'
              value={state.email}
              onChange={handleChange}
            />

            <label htmlFor='password'>
              <b className='font-mono'>Password</b>
            </label>
            <input
              type='password'
              placeholder='XXXXX'
              name='password'
              value={state.password}
              onChange={handleChange}
            />

            <hr />

            <button
              type='submit'
              className='loginbtn'
              disabled={validateForm()}
              className='text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 cursor-pointer'
            >
              Login
            </button>
          </div>
        </form>
      </body>
    </section>
  );
};

export default Login;
