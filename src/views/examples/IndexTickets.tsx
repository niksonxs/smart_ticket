import { useNavigate } from "react-router-dom";
import { Col, Row, Button } from "reactstrap";

export const IndexTickets = () => {
  const navigate = useNavigate();
  return (
    <>
      <Col className="d-flex align-items-center flex-column ">
        <Row className="mb-4 mt-4">
          <Button onClick={() => navigate("/buy")} className="btn-success">
            Cumpara bilet
          </Button>
        </Row>
        <Row>
          <Button onClick={() => navigate("/tickets")} className="btn-warning">
            Biletele mele
          </Button>
        </Row>
      </Col>
    </>
  );
};
