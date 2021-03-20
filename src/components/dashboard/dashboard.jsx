import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "react-bootstrap";

export const Dashboard = (props) => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
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
      <Button varaint="link" onClick={handleLogOut}>
        Sign Out
      </Button>
    </>
  );
};
