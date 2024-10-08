import { useState, useEffect } from "react";
// Component
import { Header, Input } from "../../../components";
import { API_ENDPOINT } from "../../../constant/constant";
import { successToastify, errorToastify } from "../../../helper/toast"

// Library
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// CSS
import "./LoginScreen.css";

const LoginScreen = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false); 

  // Toggle the password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };


  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    };
    try {
      const { data } = await axios.post(
        `${API_ENDPOINT}/login`,
        { email, password },
        config
      );
      // cookie.set("token", data.token)
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("bankId", data?.bank?._id)
      localStorage.setItem("bank", JSON.stringify(data))
      navigate("/dashboard", { replace: true });
      successToastify(`Welcome ${email}`)
    } catch (error) {
      console.log(error)
      setPassword("")
      errorToastify(`${error?.response?.data?.message}`)
    }
  };

  return (
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen__form">
        <Header category="Page" title="Login" />
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <Input
            type="email"
            required
            id="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <Link to="/forgotpassword" className="login-screen__forgotpassword">
              Forgot Password?
            </Link>
          </label>
          <Input
          label="Password"
          type="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;


// "proxy": "http://localhost:8000",
