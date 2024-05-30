import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import { useAuthStore } from "store/AuthStoreProvider";
import { AuthenticationContext } from "types";

export const Success = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuthStore();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/payments`).then((res) => {
      const authContext: AuthenticationContext = JSON.parse(
        localStorage.getItem("auth")!
      );

      if (authContext) {
        setAuth({
          ...authContext,
          role: authContext.role,
          balance: res.data.balance,
          username: authContext.username,
          isAuth: true,
        });

        localStorage.setItem(
          "auth",
          JSON.stringify({
            role: authContext.role,
            balance: res.data.balance,
            username: authContext.username,
            isAuth: true,
          })
        );
      }
    });
  }, []);

  setTimeout(() => {
    navigate(`/`);
  }, 5000);

  return (
    <>
      <main style={{ minHeight: "100vh" }}>
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
            <Button
              onClick={() => navigate(`/tickets`)}
              className="btn-sm  mb-2 btn-primary "
            >
              <div className="ni ni-bold-left"></div> Inapoi la bilete
            </Button>
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="d-flex flex-column gap-2">
                    <h1 className="text-center">Plata efectuata cu succes</h1>
                    <p className="text-center">Multumim pentru cumparatura</p>
                    <p className="text-center">
                      In scurt timp veti fi redirectionat pe pagina principala
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
};
