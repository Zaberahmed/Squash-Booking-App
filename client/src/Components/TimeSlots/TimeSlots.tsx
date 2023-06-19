import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ListTimeProps {
  time: string;
  selectedDate: Date | null;
}

const TimeSlots: React.FC<ListTimeProps> = ({ time, selectedDate }) => {
  const [showButtons, setShowButtons] = useState(true);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Handle button click logic here
    console.log(`Button clicked for time slot: ${time}`);
  };

  const handleNextButtonClick = () => {
    navigate('/next-route');
    // Handle next button click logic here
    console.log(`Next button clicked for time slot: ${time}`);
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
      className='list-time-container'
    >
      {showButtons && (
        <p className='bg-green-400 rounded-md p-5 m-5'>{time}</p>
      )}
      {!showButtons && (
        <div className='flex flex-col sm:flex-row'>
          <button
            onClick={handleButtonClick}
            className='bg-gray-500 rounded-md p-2 m-2'
          >
            {time}
          </button>
          <button
            className='bg-green-500 rounded-md p-2 m-2'
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
