import { useEffect, useState } from 'react';
import './MembersList.css';
import User from '../../Interfaces/User.interface';
import authJWT from '../../Services/UserJWT.service';
import { useNavigate } from 'react-router-dom';

const initialState: User[] = [];

const MembersList = () => {
  const [member, setMember] = useState<User[]>(initialState);

  const navigate = useNavigate();
  const path = '/register';
  const routeChange = () => {
    navigate(path);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await authJWT.membersList();
        console.log(result);
        setMember(result);
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (membershipId: string) => {
    setMember((prevMembers) =>
      prevMembers.filter(
        (memberItem) => memberItem.membershipId !== membershipId
      )
    );
  };

  return (
    <div className='container'>
      <div className='top-right'>
        <button
          className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
          onClick={routeChange}
        >
          +Add Member
        </button>
      </div>
      <div className='center'>
        <h1>Members List</h1>
      </div>
      <div className='cards'>
        {member.map((memberItem) => (
          <div
            className='card bg-gradient-to-r from-cyan-100 to-blue-200'
            key={memberItem.membershipId}
          >
            <h3 className='card-name font-sans'>Name: {memberItem.name}</h3>
            <h3 className='card-name font-sans'>Email: {memberItem.email}</h3>
            <h3 className='card-name font-sans'>Phone: {memberItem.phone}</h3>
            <h3 className='card-name font-sans'>
              membership ID: {memberItem.membershipId}
            </h3>
            <div className='card-bottom'>
              <span
                className='delete-icon'
                onClick={() => handleDelete(memberItem.membershipId)}
              >
                <svg
                  className='cursor-pointer w-6 h-6 text-gray-800 dark:text-white'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 16'
                >
                  <path d='M19 0H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1ZM2 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6H2Zm11 3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0h2a1 1 0 0 1 2 0v1Z' />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersList;
