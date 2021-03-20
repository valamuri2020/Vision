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
} from "./registerStyles";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const Register = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signUp } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
      history.push("/signin")
    } catch {
      setError("Failed to create account");
    }

    setLoading(false);
  };
  return (
    <RegisterContainer>
      <ContentWrapper classname="w-100">
        <DarkPinkCard>
          <CardContent>
            <Header>Sign Up</Header>
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
              <Form.Group id="password-confirm">
                <WhiteFormLabel>Confirm Password</WhiteFormLabel>
                <Textbox
                  type="password"
                  required
                  ref={passwordConfirmRef}
                ></Textbox>
              </Form.Group>
              <SubmitButton type="submit" disabled={loading}>
                Sign Up
              </SubmitButton>
            </Form>
          </CardContent>
        </DarkPinkCard>
        <SignInText>
          Already Have an account? <Link to="/signin">Sign In</Link>
        </SignInText>
      </ContentWrapper>
    </RegisterContainer>
  );
};
