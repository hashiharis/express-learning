import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { axiosInstance } from "../apis/axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserNavbar = () => {
  const [userData, setUserData] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const userId = localStorage.getItem("test-userid") || null;
    console.log("id", userId);
    if (userId) {
      fetchUserId(userId);
    } else {
      navigate("/signin");
    }
  }, []);

  const fetchUserId = async (id) => {
    try {
      console.log(id);
      const res = await axiosInstance.get(`user/${id}`);

      console.log("response", res);
      // console.log("resposedata", res.data.user);
      if (res.status === 200) {
        setUserData(res?.data?.userData?.name);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("userData", userData);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/signin">Sign in</Nav.Link>
            <Nav.Link href="/signup">Sign up</Nav.Link>
            {userData && `Username:${userData}`}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
