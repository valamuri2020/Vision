import React, { useState, useRef } from "react";
import { Card, Form } from "react-bootstrap";
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

export const Register = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  return (
    <RegisterContainer>
      <ContentWrapper classname="w-100">
        <DarkPinkCard>
          <CardContent>
            <Header>Sign Up</Header>
            <Form>
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
                <Textbox type="password" required ref={passwordConfirmRef}></Textbox>
              </Form.Group>
              <SubmitButton type="submit">Sign Up</SubmitButton>
            </Form>
          </CardContent>
        </DarkPinkCard>
        <SignInText>Already Have an account? Log In</SignInText>
      </ContentWrapper>
    </RegisterContainer>
  );
};
