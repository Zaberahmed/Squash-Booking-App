import React, { useState, ChangeEvent } from 'react';
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
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

interface ListTimeProps {
  time: string;
  selectedDate: Date | null;
}

const TimeSlots: React.FC<ListTimeProps> = ({ time, selectedDate }) => {
  const [showButtons, setShowButtons] = useState<boolean>(true);
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');

 
const handleOpen = (): void => setOpen(true);
const handleClose = (): void => setOpen(false);
const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

//   const navigate = useNavigate();

  const handleButtonClick = () => {
    // Handle button click logic here
    console.log(`Button clicked for time slot: ${time}`);
  };

//   const handleNextButtonClick = () => {
//     navigate('/next-route');
//     // Handle next button click logic here
//     console.log(`Next button clicked for time slot: ${time}`);
//   };

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
          <div>
      <Button onClick={handleOpen}>Next</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           You want to Play With
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div>
              <label>
                <input
                  type='radio'
                  value='instructor'
                  checked={selectedRole === 'instructor'}
                  onChange={handleRoleChange}
                />
                Instructor
              </label>
              <label>
                <input
                  type='radio'
                  value='member'
                  checked={selectedRole === 'member'}
                  onChange={handleRoleChange}
                />
                Member
              </label>
            </div>
          </Typography>
          {selectedRole === 'instructor' && (
              <select value={selectedOption} onChange={handleDropdownChange}>
                <option value=''>-- Select an instructor option --</option>
                <option value='Instructor Option 1'>Instructor Option 1</option>
                <option value='Instructor Option 2'>Instructor Option 2</option>
                <option value='Instructor Option 3'>Instructor Option 3</option>
              </select>
            )}
            {selectedRole === 'member' && (
              <select value={selectedOption} onChange={handleDropdownChange}>
                <option value=''>-- Select a member option --</option>
                <option value='Member Option 1'>Member Option 1</option>
                <option value='Member Option 2'>Member Option 2</option>
                <option value='Member Option 3'>Member Option 3</option>
              </select>
            )}
        </Box>
      </Modal>
    </div>
        </div>
      )}



    </div>
  );
};

export default TimeSlots;
