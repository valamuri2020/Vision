import React, { useState } from 'react'
import { Card, Element, Heading } from './listStyles.jsx'
import { Button, Input } from 'reactstrap';
import { Link } from "react-router-dom";
import AsyncSelect from 'react-select/async'
import { universityOptions } from "./universities.js"

export default function ListCard() {

    const [university, setUniversity] = useState('')

    const handleChange = (option) => {
        setUniversity(option)
        console.log(option)
    }

    // async handling of user input as api request will be made to fetch data 
    const handleFilter = (inputValue) => {
        return universityOptions.filter(i =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const promiseOptions = inputValue =>
        new Promise(resolve => {
            setTimeout(() => {
            resolve(handleFilter(inputValue));
        }, 1000);
    });

    return (
        <Card>
            <Element>
                <Heading>University</Heading>
                <AsyncSelect loadOptions={promiseOptions} onChange={handleChange}/>
            </Element>
            <Element>
                <Heading>Location</Heading>
                <div>{university?.["location"]}</div>
            </Element>
            <Element>
                {/* average cost to be inputted by the user */}
                <Heading>AVG Cost</Heading>
                <Input/>
            </Element>
            <Element>
                <Heading>AVG ACT/SAT</Heading>
                { university && <span>ACT: {university["avg_act"]} <br/> SAT: {university["avg_sat"]}</span>}
            </Element>
            <Element>
                <Heading>Acceptance %</Heading>
                <span>{university?.["acceptance_rate"]}</span>
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
