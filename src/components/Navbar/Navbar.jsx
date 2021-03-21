import React from 'react'
import { Container } from './navbarStyle.jsx'
import { FaUserCircle } from 'react-icons/fa'

export default function Navbar() {
    return (
        <Container>
            <h3>New Vision</h3>
            <FaUserCircle style={{ fontSize: '2em'}} />
        </Container>
    )
}
