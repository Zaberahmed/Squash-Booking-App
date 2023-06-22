import React, { useState, ChangeEvent, useEffect } from 'react';

const SelectPerson: React.FC = () => {
  
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');
 
  
  const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedOption(event.target.value);
  };

  const handleRoleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedRole(event.target.value);
    setSelectedOption('');
  };

 

  return (
    <div>
      
      <div className="accent h-screen mt-24 rounded-t-3xl drop-shadow-2xl">
       

      <h1 className='font-serif text-center pt-16 '>You want to play with</h1>
          <div className="flex justify-center items-center h-44">
         
            <div className=''>
              <div className='mb-5'>
                <label>
                  <input
                    type="radio"
                    value="instructor"
                    checked={selectedRole === 'instructor'}
                    onChange={handleRoleChange}
                   
                  />
                  Instructor
                </label>
                <label>
                  <input
                    type="radio"
                    value="member"
                    checked={selectedRole === 'member'}
                    onChange={handleRoleChange}
                    className='ml-5'
                  />
                  Member
                </label>
              </div>
              {selectedRole === 'instructor' && (
                <select value={selectedOption} onChange={handleDropdownChange}>
                  <option value="">Choose instructor </option>
                  <option value="Instructor Option 1">Instructor Option 1</option>
                  <option value="Instructor Option 2">Instructor Option 2</option>
                  <option value="Instructor Option 3">Instructor Option 3</option>
                </select>
              )}
              {selectedRole === 'member' && (
                <select value={selectedOption} onChange={handleDropdownChange}>
                  <option value="">Choose member </option>
                  <option value="Member Option 1">Member Option 1</option>
                  <option value="Member Option 2">Member Option 2</option>
                  <option value="Member Option 3">Member Option 3</option>
                </select>
              )}
            </div>
          </div>
        <button className='text-center bg-blue-200 rounded p-4 ml-32 ' disabled={selectedOption===''}>confirm</button>
      </div>
    </div>
  );
};

export default SelectPerson;
