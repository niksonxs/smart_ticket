import React, { useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
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
import DemoNavbar from "../../components/Navbars/DemoNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../../store/AuthStoreProvider";

export const Register = () => {
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const navigate = useNavigate();
  const { auth, setAuth } = useAuthStore();

  type accessToken = {
    username: string;
    role: { id: number; name: string };
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { firstName, lastName, username, email, password } =
      e.target.elements;

    axios
      .post(`${process.env.REACT_APP_API_URL}/signup`, {
        firstName: firstName.value,
        lastName: lastName.value,
        username: username.value,
        email: email.value,
        password: password.value,
      })

      .then(() => {
        navigate(`/login`);
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
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupText>
                            <i className="ni ni-hat-3" />
                          </InputGroupText>
                          <Input
                            placeholder="First name"
                            type="text"
                            id="firstName"
                          />
                          <Input
                            placeholder="Last name"
                            type="text"
                            id="lastName"
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupText>
                            <i className="ni ni-hat-3" />
                          </InputGroupText>
                          <Input placeholder="Username" id="username" />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                          <Input placeholder="Email" type="email" id="email" />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                          <Input
                            placeholder="Password"
                            type="password"
                            autoComplete="off"
                            id="password"
                          />
                        </InputGroup>
                      </FormGroup>

                      <div className="text-center">
                        <Button className="mt-4" color="primary" type="submit">
                          Create account
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
export default Register;
