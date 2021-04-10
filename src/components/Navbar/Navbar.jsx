import { Container, Title } from "./navbarStyle.jsx";
import { FaUserCircle } from "react-icons/fa";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.js";
import { Alert, Button } from "react-bootstrap";

export default function Navbar(props) {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();

  const handleLogOut = async () => {
    setError("");
    try {
      await logout();
      history.push("/signin");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <Title>
        <a href='/'>Vision</a>
      </Title>
      {error && <Alert variant="warning">{error}</Alert>}
      <div>
        <Button variant="link" style={{color: 'white'}} onClick={handleLogOut}>
          Sign Out
        </Button>
        <FaUserCircle style={{ fontSize: "2em" }} />
      </div>
    </Container>
  );
}
