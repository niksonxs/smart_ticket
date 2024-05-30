import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStoreProvider";
import { Ticket } from "../../types";
import ReactLoading from "react-loading";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import { smartDate } from "../../utils";
import QRCode from "react-qr-code";

export const ValidateTicket = () => {
  const { auth, setAuth } = useAuthStore();
  const [ticket, setTicket] = useState<Ticket>();
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { validationCode } = useParams();

  useEffect(() => {
    setTimeout(() => {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/tickets/validate/${validationCode}`
        )
        .then((response) => {
          setTicket(response.data);
          setIsValid(true);
        })
        .catch((error) => {
          setIsValid(false);
          console.error(error);
        });
    }, 2000);
  }, [validationCode]);

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
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="d-flex flex-column gap-2">
                    {isValid === null || !ticket ? (
                      <div className="d-flex align-items-center ">
                        <ReactLoading
                          className="mr-4"
                          type="spin"
                          color="#ADD8E6"
                        />
                        In process de validare
                      </div>
                    ) : (
                      <Card className="shadow shadow-lg--hover">
                        <CardBody className="d-flex flex-column  justify-content-center ">
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
                            </div>
                            <div>
                              {" "}
                              {new Date(ticket.expirationDate) > new Date() ? (
                                <>
                                  {" "}
                                  {ticket.isUsed && (
                                    <p className="responsive-label text-warning">
                                      FOLOSIT
                                    </p>
                                  )}
                                </>
                              ) : (
                                <p className="responsive-label text-danger">
                                  EXPIRAT
                                </p>
                              )}
                            </div>
                          </div>
                          {isValid ? (
                            <h3 className="text-green">
                              Acest bilet este valid
                            </h3>
                          ) : (
                            <h3 className="text-red">
                              Acest bilet nu este valid
                            </h3>
                          )}
                          <div
                            className="d-flex flex-column align-items-center  "
                            style={{ background: "white", padding: "16px" }}
                          >
                            <QRCode
                              value={`${process.env.REACT_APP_URL}/validate/${ticket.validationCode}`}
                            />
                            <div className="mt-2">
                              Cumparat: {smartDate(ticket.purchaseDate)}
                              <div>
                                Valabil: {smartDate(ticket.expirationDate)}
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    )}
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
