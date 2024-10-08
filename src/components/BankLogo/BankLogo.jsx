import React, { useState } from 'react';
import axios from 'axios';
import { useStateContext } from '../../contexts/ContextProvider';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import "./BankLogo.css"

const BankLogo = () => {
  const { currentColor } = useStateContext(); // Get current color from context
  const [file, setFile] = useState(null); // Store the uploaded file
  const [isLoading, setIsLoading] = useState(false); // Control icon animation

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload submission
  const handleSubmit = async () => {
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    setIsLoading(true); // Start icon animation

    const formData = new FormData();
    formData.append('file', file); // Append file to formData

    try {
      // API call to upload the file (replace URL with your API endpoint)
      const response = await axios.post('http://localhost:5000/api/v1/upload-logo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
      setIsLoading(false); // Stop icon animation
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      setIsLoading(false); // Stop icon animation
      alert('File upload failed');
    }
  };

  return (
    <div className="file-upload-container">
      <label
        className={`file-upload-label border-dashed border-4 p-10 rounded-lg flex flex-col items-center justify-center cursor-pointer`}
        style={{
          borderColor: currentColor // Dynamic dashed border based on currentColor
        }}
      >
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange} // Capture file on change
        />
        <AiOutlineCloudUpload
          className={`text-6xl ${isLoading ? 'animate-spin' : ''}`} // Add animation class on loading
          style={{ color: currentColor }} // Icon color based on currentColor
        />
        <p className="text-gray-500 mt-4">Click to upload a logo</p>
        {file && <p className="text-gray-700 mt-2">Selected file: {file.name}</p>} {/* Display file name */}
      </label>

      {/* Submit button */}
      <button
        className="mt-5 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default BankLogo;
