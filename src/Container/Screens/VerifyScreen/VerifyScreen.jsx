import { useState } from "react";

// Component
import { Header, Input } from '../../../components'
import { API_ENDPOINT } from "../../../constant/constant";
import { successToastify, errorToastify } from "../../../helper/toast"

// Library
import { Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

// CSS
import "./VerifyScreen.css";

const VerifyScreen = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState("");



  const verifyHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      return errorToastify("Password donot match")
    }
    try {
      const { data } = await axios
        .put(
          `${API_ENDPOINT}/force-reset-password`,
          {
            email,
            password,
            confirmPassword
          },
          config
        );
      setSuccess(data.data);
      successToastify("Verification Complete")
      setPassword("")
      setConfirmPassword("")
      navigate("/")
    }
    catch (error) {
      setPassword("")
      setConfirmPassword("")
      errorToastify(`${error.response}`)
    }
  };

  return (
    <div className="resetpassword-screen">
      <form
        onSubmit={verifyHandler}
        className="resetpassword-screen__form"
      >
        <Header category = "Authenticate" title = "Verification" />
        <Input
          label="Email"
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Pass the onChange handler as prop
        />
        <Input
          label="Password"
          type="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         <Input
          label="Confirm Password"
          type="password"
          id="confirmpassword"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyScreen;