
import React from "react";
import { Container, Row, Col, UncontrolledCarousel } from "reactstrap";



const ImageCarousel = () => {

  const items = [
    {
      src: require("../../assets/img/theme/chisinau0.jpg"),
      altText: "",
      caption: "",
      header: "",
    },

    {
      src: require("../../assets/img/theme/chisinau1.jpg"),
      altText: "",
      caption: "",
      header: "",
    },

    {
      src: require("../../assets/img/theme/chisinau2.jpg"),
      altText: "",
      caption: "",
      header: "",
    },
  ];

  return (
    <>
      <section className="section section-shaped ">
        <div className="shape shape-style-1 shape-default">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <Container className="py-md">
          <Row className="justify-content-between align-items-center">
            <Col className="mb-5 mb-lg-0" lg="5">
              <h1 className="text-white font-weight-light">
                Bine ati venit
              </h1>
              <p className="lead text-white mt-4">
                Aici puteti procura bilete pentru transportul public din Chisinau
              </p>

            </Col>
            <Col className="mb-lg-auto" lg="6">
              <div className="rounded shadow-lg overflow-hidden transform-perspective-right">
                <UncontrolledCarousel items={items} />
              </div>
            </Col>
          </Row>
        </Container>

      </section >
    </>
  );
}

export default ImageCarousel;
