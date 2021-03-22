import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Alert, Button } from "react-bootstrap";

export const Dashboard = (props) => {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();
  const handleLogOut = async () => {
    setError("");
    try {
      await logout();
      history.push("/signin");
    } catch {
      setError("Failed to log out");
    }
  };
  return (
    <>
      <h1>Dashboard Page</h1>
      {error && <Alert variant="warning">{error}</Alert>}
      <Button variant="link" onClick={handleLogOut}>
        Sign Out
      </Button>
    </>
  );
};
