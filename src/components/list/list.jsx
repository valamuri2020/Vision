import React from "react"
import { Container } from "../dashboard/dasboardStyle.jsx"
import ListCard from './listCard.jsx'
import Navbar from "../Navbar/Navbar"
import { useParams } from "react-router-dom";

export const List = (props) => {
    // unique id for each college in the list is passed
    // in the query. use this to get prefilled info in the listcard component
    const { id } = useParams()

    return (
        <>
            <Navbar/>
            <Container>
                <ListCard collegeId={id}/>
            </Container>
        </>
    )
}


