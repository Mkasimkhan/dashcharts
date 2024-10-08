import { useState } from "react";

// Component
import { Header } from '../../../components'
import { API_ENDPOINT } from "../../../constant/constant";
import { successToastify, errorToastify } from "../../../helper/toast"

// Library
import { Link, useParams, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

// CSS
import "./ResetPasswordScreen.css";

const ResetPasswordScreen = () => {
  const params = useParams()
  const { id } = params
  const navigate = useNavigate()
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState("");



  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      return errorToastify("Password Donot Match")
    }
    try {
      const { data } = await axios
        .put(
          `${API_ENDPOINT}/reset-password/${id}`,
          {
            password,
            confirmPassword
          },
          config
        );
      setSuccess(data.data);
      successToastify("Password Reset Successfully")
      setPassword("")
      setConfirmPassword("")
      navigate("/")
    }
    catch (error) {
      setPassword("")
      setConfirmPassword("")
      errorToastify(error.response?.data?.message)
    }
  };

  return (
    <div className="resetpassword-screen">
      <form
        onSubmit={resetPasswordHandler}
        className="resetpassword-screen__form"
      >
        <Header category = "Page" title = "Reset Password" />
        {success && (
          <span className="success-message">
            {success} <Link to="/login" className="login_btn">Login</Link>
          </span>
        )}
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            required
            id="password"
            placeholder="Enter new password"
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm New Password:</label>
          <input
            type="password"
            required
            id="confirmpassword"
            placeholder="Confirm new password"
            autoComplete="true"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordScreen;