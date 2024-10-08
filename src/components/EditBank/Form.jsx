import React, { useEffect, useState, useCallback } from 'react'
// Components
import { Header, Input, ModalButton, SelectInput} from '../../components'
import { API_ENDPOINT } from '../../constant/constant'
import { successToastify, errorToastify } from "../../helper/toast"
import { countriesData, platformData } from "../../data/countriesData"
import { config  } from "../../utils/bankRole"

// Icons
import { GiBank } from "react-icons/gi";

// Library
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

// CSS
import "../AddBank/AddBank.css"

const Form = () => {
  let navigate = useNavigate();
  let { id } = useParams()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [country, setCountry] = useState("")
  const [platform, setPlatform] = useState('');
  const [bankData, setBankData] = useState([]);
  
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
      const { data } = await axios.put(
        `${API_ENDPOINT}/bank-detail/${id}`,
        {
          name,
          email,
          password,
          contactNumber,
          platform
          
        }, config)
      navigate("/bank-list");
      successToastify("Bank Updated Successfully")

    }
    catch (error) {
      console.log(error)
      errorToastify(error?.response?.data?.message)
    }
  }

   
    const fetchBankData = useCallback(() => {
        axios
            .get(`${API_ENDPOINT}/get-banks/${id}`, config)
            .then((response) => {
                setBankData(response?.data?.bankDetail);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    useEffect(() => {
        fetchBankData();
    }, [fetchBankData]);

  return (
    <>
       <div className="register-screen">
      <form onSubmit={registerHandler} className="register-screen__form">
        <Header category="Bank" title="Edit Bank Information" />
        <Input
          label="Username"
          type="text"
          id="name"
          placeholder= {bankData?.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />   
        <Input
          label="Email"
          type="email"
          id="email"
          placeholder= {bankData?.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Contact Number"
          type="number"
          id="number"
          placeholder= {bankData?.contactNumber}
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
        <SelectInput
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            data={countriesData}
            id="country"
        />

        <ModalButton
          title="Save Changes"
          icon={<GiBank className="text-xl" />}
        />
      </form>
    </div>
    </>
  )
}

export default Form