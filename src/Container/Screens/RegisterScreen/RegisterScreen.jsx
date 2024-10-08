import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import "./RegisterScreen.css"
import { Header, Input } from '../../../components'
import { API_ENDPOINT } from '../../../constant/constant'
import { successToastify, errorToastify } from "../../../helper/toast"
import { useStateContext } from '../../../contexts/ContextProvider';


const RegisterScreen = () => {
  const { currentColor } = useStateContext();
  let navigate = useNavigate();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [role, setRole] = useState('Admin');
  
  const registerHandler = async (e) => {
    e.preventDefault()

    if (contactNumber.length < 7 || contactNumber.length > 15) {
      return errorToastify("Contact number must be between 7 to 15 characters.");
  }


    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("")
      setConfirmPassword("")
      return errorToastify("Password donot match")
    }

    try {
      const { data } = await axios.post(
        `${API_ENDPOINT}/add-user`,
        {
          name,
          email,
          password,
          role,
          contactNumber,
          
        }, config)
      navigate("/dashboard");
      successToastify(`${name} added as ${role}`)

    }
    catch (error) {
      errorToastify(error?.response?.data?.message)
    }
  }


  return (
    <>
       <div className="register-screen">
      <form onSubmit={registerHandler} className="register-screen__form">
        <Header category="Page" title="Registration" />
        {error && <span className="error-message">{error}</span>}

        {/* Use Input component for Username */}
        <Input
          label="Username"
          type="text"
          id="name"
          placeholder="Enter username"
          value={name}
          onChange={(e) => setName(e.target.value)} // Pass the onChange handler as prop
        />

        {/* Use Input component for Email */}
        <Input
          label="Email"
          type="email"
          id="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Contact Number"
          type="number"
          id="number"
          placeholder="Enter Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />

        {/* Use Input component for Password */}
        <Input
          label="Password"
          type="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Use Input component for Confirm Password */}
        <Input
          label="Confirm Password"
          type="password"
          id="confirmpassword"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Dropdown for Role */}
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)} // Handle role selection
            className="form-select mt-1 block w-full px-4 py-2 rounded border"
          >
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
          </select>
        </div>

        <button type="submit" className="btn" style={{ backgroundColor: currentColor }}>
           Register
      </button>

      </form>
    </div>
    </>
  )
}

export default RegisterScreen