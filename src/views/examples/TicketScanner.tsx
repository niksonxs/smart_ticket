import { useEffect, useRef, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import eruda from "eruda";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import { Modal } from "react-bootstrap";
import ReactLoading from "react-loading";
import { smartDate } from "utils";
import axios from "axios";
import { Ticket } from "types";
eruda.init();

export const TicketScanner = () => {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
    }
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleScan = (data: any) => {
    checkValidity(data);
  };

  const isValid = () => {
    return !(ticket?.isUsed && new Date(ticket?.expirationDate) < new Date());
  };

  const [ticket, setTicket] = useState<Ticket>();

  const checkValidity = (ticketHash: string) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/tickets/validate/${ticketHash}`)
      .then((response) => {
        setTicket(response.data);
      })
      .finally(() => {
        handleShow();
      });
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
            <Row className="justify-content-between align-items-center pt-5 pt-lg-0">
              <Col className="mb-5 mb-lg-0" lg="5">
                <div style={{ position: "relative" }}>
                  <Scanner
                    onResult={(result) => handleScan(result)}
                    onError={(error) => console.log(error?.message)}
                    options={{ delayBetweenScanSuccess: 1000 }}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
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
                            Bilet unic pentru transportul public din Chisinau
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
                      {isValid() ? (
                        <h3 className="text-green">
                          Acest bilet a fost validat
                        </h3>
                      ) : (
                        <h3 className="text-red">Acest bilet nu este valid</h3>
                      )}
                      <div
                        className="d-flex flex-column align-items-center  "
                        style={{ background: "white", padding: "16px" }}
                      >
                        <div className="mt-2">
                          Cumparat: {smartDate(ticket.purchaseDate)}
                          <div>Valabil: {smartDate(ticket.expirationDate)}</div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                )}
              </CardBody>
            </Card>
          </Modal.Body>
        </Modal>
      </main>
    </>
  );
};
