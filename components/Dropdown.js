import React from 'react';
// A template for all dropdowns on the page
const Dropdown = ({ label, options, value, onChange }) => {
  
  return (
    <div>
      <label className="block font-latoBold text-sm pb-2">{label}</label>
      <select
        className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:outline-violet-700 shadow-sm"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option} value={option.replace(/\s/g,'')}> 
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;