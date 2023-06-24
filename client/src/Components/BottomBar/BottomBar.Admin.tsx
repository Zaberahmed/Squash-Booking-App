import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineUpcoming } from 'react-icons/md';
// import { IoPeopleSharp } from 'react-icons/io';
import { GoHistory } from 'react-icons/go';
import { Link } from 'react-router-dom';

const BottomBarAdmin = () => {
  const iconSize = 30;
  return (
    <div className='flex justify-center items-center fixed bottom-16 left-0 right-0 gap-16'>
      <Link to='/members'>
        <GoHistory size={iconSize} />
      </Link>
      <Link to='/bookings'>
        <CgProfile size={iconSize} />
      </Link>

      <Link to='/event'>
        <MdOutlineUpcoming size={iconSize} />
      </Link>
    </div>
  );
};

export default BottomBarAdmin;
