import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './TimeSlots.css'
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
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');

 
const handleOpen = (): void => setOpen(true);
const handleClose = (): void => setOpen(false);
const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleRoleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(event.target.value);
    setSelectedOption('')
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
          <div className='accent mb-2 rounded-md  '>
      <Button 
       sx={{  color: 'black' }}
          onClick={handleOpen}>Next</Button>
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
          <div className='flex gap-4 mb-3'>
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
         <div className="options">

         {selectedRole === 'instructor' && (
              <select value={selectedOption} onChange={handleDropdownChange} 
              >
                <option value=''>Choose instructor </option>
                
                <option  value='Instructor Option 1'>Instructor Option 1</option>
                <option value='Instructor Option 2'>Instructor Option 2</option>
                <option value='Instructor Option 3'>Instructor Option 3</option>
               

              </select>
            )}
            {selectedRole === 'member' && (
              <select value={selectedOption} onChange={handleDropdownChange}>
                <option value=''>Choose a member </option>
                <option value='Member Option 1' >Member Option 1</option>
                <option value='Member Option 2'>Member Option 2</option>
                <option value='Member Option 3'>Member Option 3</option>
              </select>
            )}
         </div>

        </Box>
      </Modal>
    </div>
        </div>
      )}



    </div>
  );
};

export default TimeSlots;
