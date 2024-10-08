import React, { useState } from 'react';

// Fetching
import { API_ENDPOINT } from "../../constant/constant"
import axios from 'axios';

// Helper
import { successToastify, errorToastify } from "../../helper/toast"

// Components
import { useStateContext } from '../../contexts/ContextProvider';
import { Header, Input, ModalButton } from "../../components/index";
import { config  } from "../../utils/bankRole"

// Icons
import { RiLockPasswordLine } from "react-icons/ri";

// CSS
import './AccountSetting.css';

const AccountSetting = () => {
  const { currentColor } = useStateContext();
    const bankId = localStorage.getItem("bankId")
  // State to hold form data
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    bankId: bankId
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Make POST request to update password
      const response = await axios.put(`${API_ENDPOINT}/update-password`, {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
        bankId: formData.bankId
      }, config);
      successToastify(response?.data?.message)
      setFormData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        bankId: bankId // Keep bankId if needed
    });
    } catch (err) {
      // Handle error response
      if (err.response && err.response.data.message) {
        errorToastify(err.response.data.message);
      } else {
        errorToastify('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-md">
        {/* Header Component */}
        <Header category="Account Management" title="Change your password" />
        {/* Input Fields for Password Change */}
        <div className="details-container" style={{ display: 'flex', flexDirection: 'column' }}>
          <Input
            type="password"
            label="Old Password"
            name="oldPassword" // Input name for old password
            placeholder="Enter your old password"
            value={formData.oldPassword}
            onChange={handleChange} // Update form state on input change
          />
          <Input
            type="password"
            label="New Password"
            name="newPassword" // Input name for new password
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <Input
            type="password"
            label="Confirm Password"
            name="confirmPassword" // Input name for confirm password
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
      

        {/* Save Changes Button */}
        <ModalButton
          title="Save Changes"
          icon={<RiLockPasswordLine className="text-xl" />}
          onClick={handleSubmit} // Trigger form submission on button click
        />
      </div>
    </>
  );
};

export default AccountSetting;
