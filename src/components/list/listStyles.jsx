import styled from 'styled-components'

const mobileSize = '768px';

export const Container = styled.div`
    margin: 2rem 4rem;
    display:flex; 
    flex-direction: column;
    @media only screen and (max-width: ${mobileSize}) {
        margin: 2rem 1rem;
    }
`
export const Element = styled.div`
    margin:20px 10px; 

`
export const Heading = styled.div`
    font-size: 20px; 
    font-weight:700;
    height:50px;
    display:flex;
    flex-wrap:nowrap;
` 

export const Card = styled.div`
    border: 1px solid black; 
    border-radius: 1rem; 
    display:flex; 
    padding:1.2em;
    background:white;
    margin:1em;
    max-width: 100rem;
    flex-direction: column;
    justify-content:space-between;
    @media only screen and (max-width: ${mobileSize}) {
        padding: 1em;
        justify-content: center;
    }
`
