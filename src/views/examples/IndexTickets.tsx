import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Col, Row, Button } from "reactstrap";

export const IndexTickets = () => {
  const navigate = useNavigate();

  const initPayment = async () => {
    axios.post(`${process.env.REACT_APP_API_URL}/payments/pay`).then((res) => {
      window.location.href = res.data.url;
    });
  };
  return (
    <>
      <Col className="d-flex align-items-center flex-column ">
        <Row className="mb-4 mt-4">
          <Button onClick={() => navigate("/buy")} className="btn-success">
            Cumpara bilet
          </Button>
        </Row>
        <Row className="mb-4 ">
          <Button onClick={() => navigate("/tickets")} className="btn-warning">
            Biletele mele
          </Button>
        </Row>

        <Row className="mb-4 ">
          <Button onClick={() => initPayment()} className="btn-warning">
            Suplineste contul
          </Button>
        </Row>

        <Row>
          <Button onClick={() => navigate("/map")} className="btn-info">
            Harta
          </Button>
        </Row>
      </Col>
    </>
  );
};
