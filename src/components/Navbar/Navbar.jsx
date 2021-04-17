import { Container, Title } from "./navbarStyle.jsx";
import { FaUserCircle } from "react-icons/fa";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.js";
import { Alert, Dropdown } from "react-bootstrap";

export default function Navbar(props) {
  const [error, setError] = useState("");
  const { logout, currentUser } = useAuth();
  const history = useHistory();

  const { displayName, email } = currentUser;

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
        {/* <Button variant="link" style={{color: 'white'}} onClick={handleLogOut}>
          Sign Out
        </Button> */}
        <Dropdown>
          <Dropdown.Toggle variant="danger">
            <FaUserCircle style={{ fontSize: "2em" }} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleLogOut}>Sign Out</Dropdown.Item>
            <Dropdown.Header>{displayName ?? email}</Dropdown.Header>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Container>
  );
}
