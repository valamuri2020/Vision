import React from "react"
import { Container } from "../dashboard/dasboardStyle.jsx"
import ListCard from './listCard.jsx'
import Navbar from "../Navbar/Navbar"

export const List = (props) => {
    return (
        <>
            <Navbar/>
            <Container>
                <ListCard/>
            </Container>
        </>
    )
}
