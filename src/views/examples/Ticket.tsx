import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStoreProvider";
import { Ticket } from "../../types";
import ReactLoading from "react-loading";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import { smartDate } from "../../utils";
import QRCode from "react-qr-code";

export const TicketView = () => {
  const [ticket, setTicket] = useState<Ticket>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/tickets/${id}`)
      .then((response) => {
        setTicket(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

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
                    {!ticket ? (
                      <ReactLoading type="spin" color="#ADD8E6" />
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
                            {new Date(ticket.expirationDate) > new Date() ? (
                              <>
                                {" "}
                                {ticket.isUsed && (
                                  <p className="responsive-label text-warning border-0">
                                    FOLOSIT
                                  </p>
                                )}
                              </>
                            ) : (
                              <p className="responsive-label text-danger border-0  ">
                                EXPIRAT
                              </p>
                            )}
                          </div>
                          <div
                            className="d-flex flex-column align-items-center  "
                            style={{ background: "white", padding: "16px" }}
                          >
                            <QRCode value={ticket.validationCode} />
                            <div className="mt-2">
                              Cumparat: {smartDate(ticket.purchaseDate)}
                              <div>
                                Valabil: {smartDate(ticket.expirationDate)}
                                {ticket.validatedBy ? (
                                  <p>
                                    Validat de: {ticket.validatedBy.firstName}{" "}
                                    {ticket.validatedBy.lastName} (
                                    {ticket.validatedBy.id})
                                  </p>
                                ) : (
                                  <></>
                                )}
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
