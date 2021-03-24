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
  BottomLinkText
} from "../register/registerStyles";
import { GrayText } from "./forgotPasswordStyles"
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

export const ForgotPassword = (props) => {
  const emailRef = useRef();

  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  };
  return (
    <RegisterContainer>
      <ContentWrapper classname="w-100">
        <DarkPinkCard>
          <CardContent>
            <Header>Password Reset</Header>
            {error && <Alert variant="warning">{error}</Alert>}
            {message && <Alert variant="warning">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <WhiteFormLabel>Email</WhiteFormLabel>
                <Textbox type="email" required ref={emailRef}></Textbox>
              </Form.Group>
              
              <SubmitButton type="submit" disabled={loading} style={{marginBottom: "10px"}}>
                Reset Password
              </SubmitButton>
            </Form>

            <Link to="/signin" style={{ textDecoration: "none" }}>
              <GrayText>Sign In</GrayText>
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
