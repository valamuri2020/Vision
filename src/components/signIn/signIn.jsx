import React, { useState, useRef } from "react";
import { Alert, Form, FormControl } from "react-bootstrap";
import {
  RegisterContainer,
  DarkPinkCard,
  ContentWrapper,
  CardContent,
  SubmitButton,
  Header,
  WhiteFormLabel,
  Textbox,
  SignInText,
  ForgotPassword,
  BottomLinkText
} from "../register/registerStyles";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

export const SignIn = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to login");
    }

    setLoading(false);
  };
  return (
    <RegisterContainer>
      <ContentWrapper classname="w-100">
        <DarkPinkCard>
          <CardContent>
            <Header>Sign In</Header>
            {error && <Alert variant="warning">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <WhiteFormLabel>Email</WhiteFormLabel>
                <Textbox type="email" required ref={emailRef}></Textbox>
              </Form.Group>
              <Form.Group id="password">
                <WhiteFormLabel>Password</WhiteFormLabel>
                <Textbox type="password" required ref={passwordRef}></Textbox>
              </Form.Group>
              <SubmitButton type="submit" disabled={loading}>
                Sign In
              </SubmitButton>
            </Form>

            <Link to="/forgot-password" style={{ textDecoration: "none" }}>
              <ForgotPassword>Forgot Password?</ForgotPassword>
            </Link>
          </CardContent>
        </DarkPinkCard>
        <SignInText>
          Don't have an account? <Link to="/register"><BottomLinkText>Sign Up</BottomLinkText></Link>
        </SignInText>
      </ContentWrapper>
    </RegisterContainer>
  );
};
