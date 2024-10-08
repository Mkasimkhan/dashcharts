import React, { useState } from 'react';

const Input = ({ label, name, value, onChange, type = "text", step }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative z-0 w-full mb-5 group">
      <input
        type={type}
        name={name}
        id={name}
        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer transition-all duration-300 ${value ? "focus:border-blue-600" : ""}`}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        step={step}
      />
      <label
        htmlFor={name}
        className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
          isFocused || value ? "scale-75 -translate-y-6" : ""
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
