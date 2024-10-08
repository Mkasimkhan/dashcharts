// hooks/useRegister.js
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_ENDPOINT } from "../constant/constant"

const useRegister = () => {
  return useMutation(
    async ({ name, email, password, confirmPassword }) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(`${API_ENDPOINT}/register`, {
        name,
        email,
        password,
        confirmPassword,
      }, config);

      return response.data;
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("authToken", data.token);
        toast.success(`User has been added successfully`, {
          toastId: "success",
          autoClose: 4000,
        });
      },
      onError: () => {
        toast.error("Please try again or password should at least be 6 characters", {
          toastId: "error",
          autoClose: 4000,
        });
      },
    }
  );
};

export default useRegister;
