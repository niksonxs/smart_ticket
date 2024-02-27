import React from 'react';
import { Container, Row, Col, Card, CardBody, Badge, Button } from 'reactstrap';

export const Tickets = () => {
    return (
        <div className='mt-4 mb-4'>
            <Container >
                <Row className="justify-content-center mb-2 mt-2">
                    <Col lg="12"  >
                        <Row className="row-grid justify-content-center">

                            <Col lg="4">
                                <Card className="card-lift--hover shadow border-0">
                                    <CardBody className="py-5">
                                        <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                                            <i className="ni ni-istanbul" />
                                        </div>
                                        <h6 className="text-success text-uppercase">
                                            Bilet unic
                                        </h6>
                                        <p className="description mt-3">
                                            Acest bilet este valabil pentru o singura calatorie in orice mijloc de transport public din Chisinau
                                        </p>

                                        <Button
                                            className="mt-4"
                                            color="success"
                                            href="#buy"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            Cumpara
                                        </Button>
                                    </CardBody>
                                </Card>
                            </Col>

                        </Row>
                    </Col>
                </Row>
            </Container>
        </div >
    )
} 