// RegisterModal.jsx
import React from 'react';
import RegisterScreen from "../../Container/Screens/RegisterScreen/RegisterScreen"

const RegisterModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // Don't render anything if not open

    return (
        <RegisterScreen />
        
    );
};

export default RegisterModal;