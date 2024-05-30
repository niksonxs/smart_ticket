import { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { useAuthStore } from "../../store/AuthStoreProvider";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Ticket } from "../../types";
import { smartDate } from "../../utils";

const Tickets = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/tickets`)
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
                    {loading ? (
                      <ReactLoading type="spin" color="#ADD8E6" />
                    ) : (
                      tickets.map((ticket) => (
                        <Card
                          role="button"
                          onClick={() => navigate(`/tickets/${ticket.id}`)}
                          className="shadow shadow-lg--hover"
                        >
                          <CardBody>
                            <div className="d-flex px-3">
                              <div>
                                <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                                  <i className="ni ni-money-coins" />
                                </div>
                              </div>
                              <div className="pl-4">
                                <h5 className="title text-warning">
                                  Bilet unic
                                </h5>
                                <p>
                                  Bilet unic pentru transportul public din
                                  Chisinau
                                </p>
                                <p>
                                  Cumparat: {smartDate(ticket.purchaseDate)}
                                  <p>
                                    Valabil: {smartDate(ticket.expirationDate)}
                                  </p>
                                </p>
                              </div>
                              <p>
                                {new Date(ticket.expirationDate) >
                                new Date() ? (
                                  <>
                                    {" "}
                                    {ticket.isUsed && (
                                      <p className="responsive-label text-warning border-warning border-0 ">
                                        FOLOSIT
                                      </p>
                                    )}
                                  </>
                                ) : (
                                  <p className="responsive-label text-danger border-danger ">
                                    EXPIRAT
                                  </p>
                                )}
                              </p>
                            </div>
                          </CardBody>
                        </Card>
                      ))
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

export default Tickets;
