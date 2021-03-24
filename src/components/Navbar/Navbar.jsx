import { Container } from './navbarStyle.jsx'
import { FaUserCircle } from 'react-icons/fa'
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.js";
import { Alert, Button } from "react-bootstrap";

export default function Navbar(props) {
    const [error, setError] = useState("");
    // const { logout } = useAuth;
    const history = useHistory();

    const handleLogOut = async () => {
        setError("");
        try {
            let response = await useAuth.logout();
            // history.push("/signin");
        } catch(err) {
            console.log(err)
        }
        // useAuth.logout().then(function() {
        //     // Sign-out successful.
        //     console.log('User Logged Out!');
        // }).catch(function(error) {
        //     // An error happened.
        //     console.log(error);
        // });
    };
    return (
        <Container>
            <h3>Vision</h3>
            {error && <Alert variant="warning">{error}</Alert>}
            <Button variant="link" onClick={handleLogOut}>
                Sign Out
            </Button>
            <FaUserCircle style={{ fontSize: '2em'}} />
        </Container>
    )
}
