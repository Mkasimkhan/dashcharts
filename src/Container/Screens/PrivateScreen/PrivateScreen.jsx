import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./PrivateScreen.css";

const PrivateScreen = () => {
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const URL = "http://localhost:8000"
  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get(`${URL}/api/v1/`, config);
        setPrivateData(data.data);
        console.log(data.data)        
      }
      catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
        console.log(error.message)
      }
    };

    fetchPrivateDate();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("authToken")
    navigate("/login", { replace: true });
  }

  return error ? (
    <>
      <span className="error-message">{error}
        <div>
          <Link to="/login" className="login_btn">Login</Link>
        </div></span>

    </>
  ) : (
    <>
      <div style={{ background: "green", color: "white" }}>{privateData}</div>
      <button onClick={logoutHandler}>Logout</button>
    </>
  );

};

export default PrivateScreen;
