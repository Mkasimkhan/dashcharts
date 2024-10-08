import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { Button } from '../index';
import { useStateContext } from '../../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ name, role, email }) => {
  const { currentColor } = useStateContext();
  let navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("authToken")
    navigate("/", { replace: true });
  }


  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {name} </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">  {role?.toUpperCase()}  </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {email} </p>
        </div>
      </div>
      <div>
      </div>
      <div className="mt-5">
        <button
          type="button"
          onClick={logoutHandler}
          style={{
            backgroundColor: currentColor, color: "white", borderRadius: "10px", width: "full",
          }}
          className={`text p-3 w-full hover:drop-shadow-xl hover:bg-$`}
        >
          logout
        </button>
      </div>
    </div>

  );
};

export default UserProfile;
