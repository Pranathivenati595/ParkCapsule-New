import {
  Navbar,
  Container,
  Form,
  Button,
  Nav,
  NavDropdown,
  FormControl,
} from "react-bootstrap";
import ModalLogin from "./LoginModal";
import SignUpModal from "./SignUpModal";
import ForgotModal from "./ForgotModal";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../context/userContext"
export default function NavigationBar(props) {
  let logoStyles;
  logoStyles = {
    width: "15%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-10px",
  };
  let loginStyles;
  const { setUser} = useUser();
  const [user, setLocalUser] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) setLocalUser(true);
    else setLocalUser(false);
  }, []);

  if (typeof window !== "undefined") {
    if (window.innerWidth < 1022) {
      loginStyles = {
        color: "black",
        fontWeight: "bold",
        width: "100%",
        fontSize: "1.15rem",
        paddingLeft: "0%",
      };
      logoStyles = {
        width: "20%",
      };
    }
  }
  loginStyles = {
    color: "black",
    fontWeight: "bold",
    width: "15%",
    fontSize: "1.15rem",
    paddingLeft: "0rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const navigationStyles = {
    maxHeight: "100px",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
  };

  const navDeetsStyles = {
    fontSize: "1.25rem",
    color: "black",
    fontWeight: "500",
  };
  const onOpenModal = () => {
    props.setOpen(true);
  };
  const onCloseModal = () => {
    props.setOpen(false);
  };
  const onOpenSignUpModal = () => props.setSignUpOpen(true);
  const onCloseSignUpModal = () => props.setSignUpOpen(false);
  const onCloseFrogotModal = () => props.setForgotOpen(false);
  const onOpenForgotModal = () => props.setForgotOpen(true);
  const logout = () => {
    localStorage.removeItem("user");
    setLocalUser(false);
    setUser(undefined);
    router.push("/");
  };
  return (
    <Navbar bg="white" expand="lg" fixed="top">
      {console.log("user",user)}
      <Container fluid>
        <Navbar.Brand href="/" style={logoStyles}>
          <img src="/logo.png" alt="logo" width={"80%"} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={navigationStyles}
            navbarScroll
          >
            <Nav.Link style={navDeetsStyles} href="/#home">
              Home
            </Nav.Link>
            <Nav.Link style={navDeetsStyles} href="/#about">
              About Us
            </Nav.Link>
            <Nav.Link style={navDeetsStyles} href="/#features">
              Features
            </Nav.Link>
            <Nav.Link style={navDeetsStyles} href="/#contact">
              Contact us
            </Nav.Link>
          </Nav>

          {user ? (
            <Nav.Link style={loginStyles} href="#" onClick={logout}>
              Logout
              <img
                src="/LogOut.png"
                width={"23px"}
                style={{ marginLeft: "8px" }}
              />
            </Nav.Link>
          ) : (
            <Nav.Link style={loginStyles} href="#" onClick={onOpenModal}>
              Login
              <img
                src="/Locklogo.png"
                width={"60px"}
                style={{ marginLeft: "-15px" }}
              />
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
      <ModalLogin
        open={props.open}
        onCloseModal={onCloseModal}
        setOpen={props.setOpen}
        signUpOpen={props.signUpOpen}
        onOpenSignUpModal={onOpenSignUpModal}
        onCloseSignUpModal={onCloseSignUpModal}
        setForgotOpen={props.setForgotOpen}
        setLocalUser={setLocalUser}
      />
      <SignUpModal open={props.signUpOpen} onCloseModal={onCloseSignUpModal} />
      <ForgotModal
        open={props.open}
        onCloseModal={onCloseFrogotModal}
        signUpOpen={props.signUpOpen}
        forgotOpen={props.forgotOpen}
        onOpenSignUpModal={onOpenForgotModal}
        onCloseSignUpModal={onCloseSignUpModal}
        setForgotOpen={props.setForgotOpen}
      />
    </Navbar>
  );
}
