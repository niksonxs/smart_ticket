
import React from "react";
import { Container, Row, Col, UncontrolledCarousel } from "reactstrap";
import { useAuthStore } from "../../store/AuthStoreProvider";



export const AuthorizedIndex = () => {

  const { auth, setAuth } = useAuthStore();

  return (
    <>
      <section className="section section-shaped min-vh-100">
        <div className="shape shape-style-1 shape-default">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <Container className="py-md">
          <Row className="justify-content-between align-items-center pt-5 pt-lg-0">
            <Col className="mb-5 mb-lg-0" lg="5">
              <h2 className="text-white font-weight-light">
                Bine ati venit, {auth.username}
              </h2>
              <p className="lead text-white mt-2">
                Aici puteti procura bilete pentru transportul public din Chisinau
              </p>

            </Col>
          
          </Row>
        </Container>

      </section >
    </>
  );
}
