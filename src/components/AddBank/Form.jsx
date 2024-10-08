import React, { useEffect, useState } from 'react'

// Components
import { Header, Input, ModalButton, SelectInput} from '../../components'
import { API_ENDPOINT } from '../../constant/constant'
import { successToastify, errorToastify } from "../../helper/toast"
import { countriesData, platformData } from "../../data/countriesData"
import { config  } from "../../utils/bankRole"

// Library
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { GiBank } from "react-icons/gi";

// CSS
import "./AddBank.css"

const Form = () => {
  let navigate = useNavigate();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [country, setCountry] = useState("")
  const [platform, setPlatform] = useState('');

  
  const registerHandler = async (e) => {
    e.preventDefault()
    if (contactNumber.length < 7 || contactNumber.length > 15) {
      errorToastify("Contact number must be between 7 to 15 characters.");
  }
    if (password !== confirmPassword) {
        setPassword("")
        setConfirmPassword("")
        return errorToastify("Password donot match")
    }

    try {
      const { data } = await axios.post(
        `${API_ENDPOINT}/add-bank`,
        { name, email, password, contactNumber, platform, country }, config)
      navigate("/dashboard");
      successToastify("Bank Added Successfully")

    }
    catch (error) {
      console.log(error)
      errorToastify(error?.response?.data?.message)
    }
  }


  return (
    <>
       <div className="register-screen">
      <form onSubmit={registerHandler} className="register-screen__form">
        <Header category="Bank" title="Bank Registration" />
        <Input
          label="Username"
          type="text"
          id="name"
          placeholder="Enter username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />   
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
        <SelectInput
            label="Platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            data={platformData}
            id="platform"
        />
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

        <SelectInput
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            data={countriesData}
            id="country"
        />

        <ModalButton
          title="Add Bank"
          icon={<GiBank className="text-xl" />}
        />
      </form>
    </div>
    </>
  )
}

export default Form