import React, { useState } from 'react';

const MultiInput = ({ label, placeholder, name, arrayData, setArrayData, type }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();

      // Add input value to array
      setArrayData((prevArray) => [...prevArray, inputValue.trim()]);
      setInputValue(''); // Clear input field after adding
    }
  };

  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type= {type || "text"}
        placeholder={placeholder}
        value={inputValue}
        name={name}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        className="form-input mt-1 block w-full px-4 py-2 rounded border"
      />

      {/* Display the array items */}
      <div className="mt-2">
        {arrayData.map((item, index) => (
          <div key={index} className="p-1 bg-gray-200 rounded mb-1 inline-block">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiInput;