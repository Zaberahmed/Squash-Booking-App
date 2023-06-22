import { Link } from 'react-router-dom';
import lImage from '../../assets/lImage.jpg';

function Landing() {
  return (
    <div className='w-screen h-screen flex flex-col items-center bg-amber-100'>
      <h2 className='font-bold text-3xl mt-14 mb-4 text-center text-slate-700'>
        Book a Squash Court
      </h2>

      <img src={lImage} alt='Squash playing logo' />

      <Link to='/register'>
        <button className='bg-yellow-200 hover:bg-yellow-400 active:bg-slate-700 focus:outline-none focus:ring focus:ring-slate-300 text-black text-l font-semibold text-m px-4 py-2 border rounded-full mt-3 cursor-pointer'>
          Sign Up for an Account
        </button>
      </Link>
      <p className='mt-3  text-slate-700'>Already a member?</p>
      <Link to='/login'>
        <button className='bg-yellow-200 hover:bg-yellow-400 active:bg-slate-700 focus:outline-none focus:ring focus:ring-slate-300 text-black text-l font-semibold text-m px-4 py-2 border rounded-full mt-3 cursor-pointer'>
          Login
        </button>
      </Link>
    </div>
  );
}

export default Landing;
