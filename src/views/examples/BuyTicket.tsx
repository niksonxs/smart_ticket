import { useRef, useState } from "react";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import { useAuthStore } from "../../store/AuthStoreProvider";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BuyTicket = () => {
  const mainRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useAuthStore();

  const handlePurchase = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (auth.balance! < 6) {
        alert("Fonduri insuficiente");
        setLoading(false);
        return;
      }
      axios
        .post(`${process.env.REACT_APP_API_URL}/tickets`)
        .then((response) => {
          setAuth({
            ...auth,
            balance: auth.balance! - 6,
          });
          navigate(`/tickets/${response.data.id}`);
        })
        .catch((error) => {
          alert("Eroare la cumparare");
          setLoading(false);
        });
    }, 4000);
  };

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
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardBody>
                    <Card className="shadow shadow-lg--hover mt-2">
                      <CardBody>
                        {loading ? (
                          <ReactLoading type="spin" color="#ADD8E6" />
                        ) : (
                          <div className="d-flex px-3">
                            <div>
                              <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                                <i className="ni ni-money-coins" />
                              </div>
                            </div>
                            <div className="pl-4">
                              <h5 className="title text-warning">Bilet unic</h5>
                              <p>
                                Bilet unic pentru transportul public din
                                Chisinau
                              </p>
                              <Button
                                className="btn btn-warning "
                                onClick={(e) => handlePurchase(e)}
                              >
                                Cumpara
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardBody>
                    </Card>
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

export default BuyTicket;
