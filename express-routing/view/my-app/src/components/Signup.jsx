import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChanges = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validationCheck();
    sendDataToServer();
  };

  function validationCheck() {
    const { name, age, email, password } = userDetails;
    if (!name || !age || !email || !password) {
      return alert("Please enter all required fields");
    } else {
      if (password.length < 8) {
        return alert("Passwords must have atleast 8 characters");
      }
    }
  }

  const sendDataToServer = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/user/signup",
        userDetails
      );
      if (res.status === 201) {
        toast.success("Sign up is successful");
        navigate("/signin");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Error on sign up frontend", error);
    }
  };

  console.log(userDetails);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>
        <input
          type="text"
          placeholder="name"
          name="name"
          onChange={handleChanges}
        />
        <br />
        <br />
        <input
          type="number"
          placeholder="age"
          name="age"
          onChange={handleChanges}
        />
        <br />
        <br />
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
        <input type="submit" value="Signup" />
        <br />
        <br />
      </form>
    </>
  );
};
