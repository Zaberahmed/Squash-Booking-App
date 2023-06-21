import React, { useState, ChangeEvent } from 'react';
import './TimeSlots.css'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    height:200,
    bgcolor: '#E1F5FE',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)',
    borderRadius: '5px',
    p: 4,
  };
  

interface ListTimeProps {
  time: string;
  selectedDate: Date | null;
}

const TimeSlots: React.FC<ListTimeProps> = ({ time, selectedDate }) => {
  const [showButtons, setShowButtons] = useState<boolean>(true);
  

 

  const navigate= useNavigate();
  const handleNextButtonClick = () => {
    navigate('/selectperson');
    // Handle next button click logic here
    console.log(`Next button clicked for time slot: ${time}`);
  };



  const handleButtonClick = () => {
   
    console.log(`Button clicked for time slot: ${time}`);
  };



  const handleMouseEnter = () => {
    setShowButtons(false);
  };

  const handleMouseLeave = () => {
    setShowButtons(true);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    className='mx-16'
    >
      {showButtons && (
        <p className='accent rounded-md p-5 m-5 text-center text-black'>{time}</p>
      )}
      {!showButtons && (
        <div className='flex justify-center gap-2'>
          <button
            onClick={handleButtonClick}
            className=' flex flex-col sm:flex-row border-2
             border-yellow-400 bg-yellow-50 rounded-md
              px-10 py-4 mb-2 '
          >
            {time}
          </button>
          <button
            className=''
            onClick={handleNextButtonClick}
          >
            Next
          </button>
        </div>
      )}



    </div>
  );
};

export default TimeSlots;
