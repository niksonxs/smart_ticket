import { useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import { useAuthStore } from "../../store/AuthStoreProvider";

export const Login = () => {
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const navigate = useNavigate();
  const { auth, setAuth } = useAuthStore();

  type accessToken = {
    username: string;
    balance: number;
    role: { id: number; name: string };
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { username, password } = e.target.elements;

    axios
      .post(`${process.env.REACT_APP_API_URL}/signin`, {
        username: username.value,
        password: password.value,
      })

      .then((response) => {
        const { accessToken, refreshToken } = response.data.tokens;
        const decodedToken = jwt<accessToken>(accessToken);

        setAuth({
          ...auth,
          isAuth: true,
          username: decodedToken.username,
          role: decodedToken.role,
          balance: decodedToken.balance,
        });
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("auth", JSON.stringify(decodedToken));
        navigate(`/`);
      })
      .catch((error) => {
        setErrorMessage(
          Array.isArray(error.response.data.message)
            ? error.response.data.message
            : [error.response.data.message]
        );
      });
  };
  return (
    <>
      <main>
        <section className="section section-shaped section-lg min-vh-100">
          <div className="shape shape-style-1 bg-gradient-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="pt-lg-7">
            <Row className="justify-content-center">
              <Col lg="5">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    <Form onSubmit={handleSubmit}>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                          <Input
                            placeholder="Email or username"
                            id="username"
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                          <Input
                            id="password"
                            placeholder="Password"
                            type="password"
                            autoComplete="off"
                          />
                        </InputGroup>
                      </FormGroup>

                      <div className="text-center">
                        <Button className="my-4" color="primary" type="submit">
                          Sign in
                        </Button>
                      </div>
                    </Form>
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

export default Login;
