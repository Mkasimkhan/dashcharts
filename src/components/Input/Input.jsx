import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import the eye icons

const Input = ({ label, type, id, placeholder, value, onChange, name}) => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Toggle the password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className="form-group relative">
      <label htmlFor={id}>{label}</label>
      <input
        type={type === 'password' && showPassword ? 'text' : type} // Conditionally render text or password
        id={id}
        required
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        className="form-input mt-1 block w-full px-4 py-2 rounded border"
      />

      {/* Conditionally render the eye icon if the input type is password */}
      {type === 'password' && (
        <span
          className="absolute right-4 top-10 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
        </span>
      )}
    </div>
  );
};

export default Input;

