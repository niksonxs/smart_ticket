import { useEffect, useRef } from "react";
import ImageCarousel from "./IndexSections/ImageCarousel";
import { useAuthStore } from "../store/AuthStoreProvider";
import { Container, Row, Col } from "reactstrap";
import { IndexTickets } from "./examples";

const Index = () => {
  const mainRef = useRef<HTMLElement>(null);
  const { auth, setAuth } = useAuthStore();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
    }
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <>
      <main ref={mainRef} style={{ minHeight: "100vh" }}>
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
                  Bine ati venit{auth.isAuth ? `, ${auth.username}` : ""}
                </h2>
                {auth.isAuth ? (
                  <IndexTickets />
                ) : (
                  <p className="lead text-white mt-2">
                    Aici puteti procura bilete pentru transportul public din
                    Chisinau
                  </p>
                )}
              </Col>
              <ImageCarousel />
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
};

export default Index;
