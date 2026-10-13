import React, { useState } from 'react';

// Array of Air Force rank abbreviations
const airForceRanks = [
  'AB',  // Airman Basic
  'Amn',  // Airman
  'A1C',  // Airman First Class
  'SrA',  // Senior Airman
  'SSgt',  // Staff Sergeant
  'TSgt',  // Technical Sergeant
  'MSgt',  // Master Sergeant
  'SMSgt',  // Senior Master Sergeant
  'CMSgt',  // Chief Master Sergeant
  '2d Lt',  // Second Lieutenant
  '1st Lt',  // First Lieutenant
  'Capt',  // Captain
  'Maj',  // Major
  'Lt Col',  // Lieutenant Colonel
  'Col',  // Colonel
  'Brig Gen',  // Brigadier General
  'Maj Gen',  // Major General
  'Lt Gen',  // Lieutenant General
  'Gen',  // General
  'CIV'  // Civilian
];

const InfoInput = ({ setModalOpen, setMemberInfo, memberInfo }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    // Validate that all required fields are filled out
    if (!memberInfo.name || !memberInfo.rank || !memberInfo.unit) {
      setErrorMessage('All fields are required.');
      return;
    }

    // Close the modal if validation passes
    setModalOpen(false);
  };

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <div className='input-info-con'>
          
          {errorMessage && <p style={{ color: 'red', fontSize: '1rem' }}>{errorMessage}</p>}
          <label>Name:</label>
          <input 
            value={memberInfo.name}
            onChange={(e) => setMemberInfo((prev) => ({ ...prev, name: e.target.value }))} 
            type="text" 
            placeholder="Enter your name" 
          />
          
          <label>Rank:</label>
          <select
            value={memberInfo.rank}
            onChange={(e) => setMemberInfo((prev) => ({ ...prev, rank: e.target.value }))}
          >
            <option value="" disabled>Select your rank</option>
            {airForceRanks.map((rank, index) => (
              <option key={index} value={rank}>
                {rank}
              </option>
            ))}
          </select>
          
          <label>Unit:</label>
          <input 
            value={memberInfo.unit}
            onChange={(e) => setMemberInfo((prev) => ({ ...prev, unit: e.target.value }))} 
            type="text" 
            placeholder="Enter your unit" 
          />
        </div>
        
        {/* Display error message if any */}
        
        <button className='modal-button' onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default InfoInput;
