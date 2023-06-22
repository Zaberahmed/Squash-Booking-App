import React from 'react';
// import '../Profile/Profile.css';
import './MemberList.css';

const MemberLists = () => {
  return (
    <div className='container'>
      <div className='center'>
        <h1>Members List</h1>
      </div>
      <div className='cards'>
        <div className='card'>
          <h3 className='card-name'>John Doe</h3>
          <a href='#' className='btn'>
            123456
          </a>
        </div>
        <div className='card'>
          <h3 className='card-name'>Avazov Temur</h3>
          <a href='#' className='btn'>
            543218
          </a>
        </div>
        <div className='card'>
          <h3 className='card-name'>Zaber Ahmed</h3>
          <a href='#' className='btn'>
            684975
          </a>
        </div>
        <div className='card'>
          <h3 className='card-name'>Rafia Sultana</h3>
          <a href='#' className='btn'>
            847963
          </a>
        </div>
        <div className='card'>
          <h3 className='card-name'>Asif Rahman</h3>
          <a href='#' className='btn'>
            456971
          </a>
        </div>
        <div className='card'>
          <h3 className='card-name'>Bobur Rajapov</h3>
          <a href='#' className='btn'>
            941873
          </a>
        </div>
      </div>
    </div>

    // <div className='profile-card'>
    //   <div className='profile-details'>
    //     <h1 className='text-5xl'>Members list</h1>
    //     <br />
    //     <p>
    //       <strong>Name:</strong> Richard Jackson
    //     </p>
    //     <p>
    //       <strong>Membership ID:</strong> 293456459
    //     </p>
    //     <br />
    //     <p>
    //       <strong>Name:</strong> Richard Jackson
    //     </p>
    //     <p>
    //       <strong>Membership ID:</strong> 293456459
    //     </p>
    //     <br />
    //   </div>
    // </div>
  );
};

export default MemberLists;
