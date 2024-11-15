import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../apis/baseurl";
export const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });
  const [imgFile, setImgFile] = useState(null);
  const [imgLink, setImgLink] = useState("");

  const navigate = useNavigate();

  const handleChanges = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
    const file = e.target.files[0];

    setImgFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validationCheck();
    if (!imgFile) {
      alert("Please upload an image");
      return;
    }
    sendDataToServer(formData);
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

  const { name, age, email, password } = userDetails;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("age", age);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("image", imgFile);

  const sendDataToServer = async (formData) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/user/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
        // userDetails
      );
      if (res.status === 201) {
        console.log(res);
        setImgLink(res?.data?.data?.image);
        toast.success("Sign up is successful");
        // navigate("/signin");
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
        <input type="file" onChange={handleChanges} />
        <img src={`${BASE_URL}/${imgLink}`} alt="img" />
        {/* {`${BASE_URL}${imgLink}`} */}
        <input type="submit" value="Signup" />
        <br />
        <br />
      </form>
    </>
  );
};
