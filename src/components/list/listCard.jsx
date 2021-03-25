import React from 'react'
import { Card, Element, Heading } from './listStyles.jsx'
import { FormGroup, Button, Input } from 'reactstrap';
import { Link } from "react-router-dom";


export default function ListCard() {
    return (
        <Card>
            <Element>
                <Heading>University</Heading>
                <FormGroup>
                    <Input type="select">
                        <option>University of Waterloo</option>
                        <option>University of California</option>
                        <option>University of Toronto</option>
                        <option>University of Calgary</option>
                        <option>University of Ottawa</option>
                    </Input>
                </FormGroup>
            </Element>
            <Element>
                <Heading>Location</Heading>
                <div>Location insert after uni selected</div>
            </Element>
            <Element>
                <Heading>AVG Cost</Heading>
                <Input/>
            </Element>
            <Element>
                <Heading>AVG ACT/SAT</Heading>
                <span>Around some estimated amount from db</span>
            </Element>
            <Element>
                <Heading>Acceptance %</Heading>
                <span>Around some estimated amount from db</span>
            </Element>
            <Link to="/">
                <Button size="lg" block style={{margin: '10px 0px'}} color='danger'> 
                    {/* color='#F06B6B' for button does not work as expected */}
                    Submit
                </Button>
            </Link>
        </Card>
    )
}
