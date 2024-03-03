import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Headroom from "headroom.js";

import "./navbar.css";

import { ReactComponent as LogoText } from "../../assets/img/brand/logo-text.svg";
import {
  Button,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
} from "reactstrap";
import { useAuthStore } from "../../store/AuthStoreProvider";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { AuthenticationContext, Role } from "../../types";

const DemoNavbar = () => {
  useEffect(() => {
    let headroom = new Headroom(document.getElementById("navbar-main")!);
    // initialise
    headroom.init();
  }, []);
  const navigate = useNavigate();
  const { auth, setAuth } = useAuthStore();

  const handleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/signout`, {
        withCredentials: true,
      })
      .finally(() => {
        setAuth({
          isAuth: false,
        });
        localStorage.clear();
        sessionStorage.clear();
        navigate("/");
      });
  };

  useEffect(() => {
    try {
      const auth: AuthenticationContext = JSON.parse(
        localStorage.getItem("auth")!
      );
      if (auth) {
        setAuth({
          role: auth.role,
          balance: auth.balance,
          username: auth.username,
          isAuth: true,
        });
      }
    } catch (error) {
      handleLogout();
    }
  }, []);

  return (
    <>
      <header className="header-global">
        <Navbar
          className="navbar-main navbar-transparent navbar-light headroom"
          expand={true}
          id="navbar-main"
        >
          <Container>
            <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
              <LogoText style={{ height: "20px", fill: "white" }} />
            </NavbarBrand>

            <Nav className="align-items-center" navbar>
              {auth.isAuth ? (
                <>
                  <NavItem className="mr-2">
                    <span className="bg-white text-green font-weight-bold responsive-button">
                      {auth.balance} Lei
                    </span>
                  </NavItem>
                  <NavItem className=" d-lg-block ">
                    <Button
                      className="btn-text btn-icon responsive-button"
                      color="default"
                      onClick={handleLogout}
                    >
                      <span className="nav-link-inner--text ml-1 responsive-font">
                        Logout
                      </span>
                    </Button>
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem className=" d-lg-block ">
                    <Button
                      className="btn-text btn-icon responsive-button"
                      color="default"
                      onClick={() => navigate("/register")}
                    >
                      <span className="nav-link-inner--text ml-1 responsive-font">
                        Register
                      </span>
                    </Button>
                  </NavItem>
                  <NavItem className=" d-lg-block ml-2 ml-lg-4">
                    <Button
                      onClick={() => navigate("/login")}
                      className="btn-neutral btn-icon responsive-button"
                      color="default"
                    >
                      <span className="nav-link-inner--text ml-1 responsive-font">
                        Log in
                      </span>
                    </Button>
                  </NavItem>
                </>
              )}
            </Nav>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default DemoNavbar;
