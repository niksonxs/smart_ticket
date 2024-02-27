import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Headroom from "headroom.js";

import './navbar.css';

import { ReactComponent as LogoText } from '../../assets/img/brand/logo-text.svg';
import {
  Button,
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";

const DemoNavbar = () => {

  return (
    <>
      <header className="header-global">
        <Navbar
          className="navbar-main navbar-transparent navbar-light headroom"
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
              <LogoText style={{ height: "20px", fill: "white" }} />
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar_global">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse
              toggler="#navbar_global"
              navbar
            >
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/">
                      <img
                        alt="..."
                        src="assets/img/brand/logo.svg"
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button className="navbar-toggler" id="navbar_global">
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>

              <Nav className="align-items-lg-center ml-lg-auto" navbar>
                <NavItem className="d-none d-lg-block ml-lg-4">
                  <Button
                    className="btn-text btn-icon"
                    color="default"
                    href="/register-page"
                  >
                    <span className="nav-link-inner--text ml-1">
                      Sign up
                    </span>
                  </Button>
                </NavItem>
                <NavItem className="d-none d-lg-block ml-lg-4">
                  <Button
                    href="/login-page"
                    className="btn-neutral btn-icon"
                    color="default"
                  >
                    <span className="nav-link-inner--text ml-1">
                      Sign in
                    </span>
                  </Button>
                </NavItem>
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default DemoNavbar;
