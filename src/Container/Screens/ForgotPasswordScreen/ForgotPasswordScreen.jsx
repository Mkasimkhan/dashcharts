import { useState } from "react";

// Component
import { API_ENDPOINT } from "../../../constant/constant";
import { successToastify, errorToastify } from "../../../helper/toast"
import { Header } from '../../../components'

// Libaray
import axios from "axios";


// CSS
import "./ForgotPasswordScreen.css"


const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${API_ENDPOINT}/forgot-password`,
        { email },
        config
      );
      successToastify("Email Sent")
      setEmail("")
    } catch (error) {
      console.log(error)
      setEmail("");
      errorToastify("Email Not Found In Our Records")
    }
  };

  return (
    <div className="forgotpassword-screen">
      <form
        onSubmit={forgotPasswordHandler}
        className="forgotpassword-screen__form"
      >
        <Header category="Page" title="Forgot Password" />
        <div className="form-group">
          <p className="forgotpassword-screen__subtext">
            Please enter the email address you register your account with. We
            will send you reset password confirmation to this email
          </p>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" >
          Send Email
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordScreen;