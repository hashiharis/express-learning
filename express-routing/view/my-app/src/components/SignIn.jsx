import { useState } from "react";
import { axiosInstance } from "../apis/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChanges = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validationCheck();
    sendDataToServer();
  };

  function validationCheck() {
    const { email, password } = loginDetails;
    if (!email || !password) {
      return alert("Please enter all required fields");
    }
  }

  const sendDataToServer = async () => {
    try {
      const res = await axiosInstance.post("user/signin", loginDetails);
      console.log("signin");
      if (res.status === 200) {
        console.log(res);
        const userId = res?.data?.user;
        localStorage.setItem("test-userid", userId._id);
        toast.success("You are signed in");
        navigate("/");
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode == 400 || statusCode == 404) {
        toast.error("Incorrect email id and password");
      } else {
        toast.error("Please try again after some time");
      }
      console.log("Error on sign in frontend", error);
    }
  };

  return (
    <>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChanges}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChanges}
        />
        <br />
        <br />
        <input type="submit" value="Sign in" />
        <br />
        <br />
      </form>
    </>
  );
};
