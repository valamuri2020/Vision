import styled from 'styled-components'

const mobileSize = '768px';

export const Container = styled.div`
    margin: 2rem 7rem;
    display:flex; 
    flex-direction: column;
    @media only screen and (max-width: ${mobileSize}) {
        margin: 2rem 1rem;
    }
`

export const Card = styled.div`
    border: 1px solid black; 
    border-radius: 3rem; 
    display:flex; 
    min-height:15rem;
    padding:2em;
    background:white;
    margin:1em;
    max-width: 100rem;
    @media only screen and (max-width: ${mobileSize}) {
        flex-direction: column;
        padding: 1em;
        justify-content: center;
    }
`

export const AddCard = styled.div`
    border: 2px dashed black; 
    border-radius: 1rem; 
    display:flex; 
    min-height:10rem;
    padding:2em;
    justify-content: center;
    align-items: center;
    margin:1em;
    max-width: 100rem;
    @media only screen and (max-width: ${mobileSize}) {
        flex-direction: column;
        padding: 1em;
        justify-content: center;
    }
`
export const Content = styled.div`
    font-size: 1em; 
    color: ${props => props.color};
    font-weight:700;
    margin: 0.2em 0;
`
export const SubCard = styled.div`
    display:flex;
    flex-direction:column; 
    flex-wrap: wrap;
    margin-left:20px;
`

export const AddSubCard = styled.div`
    display:flex;
    justify-content:center;
    margin-left:20px;
`

export const Information = styled.div`
    font-style: italic;
    line-height: 1em;
    height: 3em;
    overflow: hidden;
    margin: 1em 0;
    text-overflow: ellipsis;
`

export const SubData = styled.div`
    margin-left: 1em;
    display:flex; 
    
    >.p {
        color: gray;
    }
`
export const Text = styled.div `
    color: blue; 
    font-size: 1em; 

    font-weight: bold;
`
export const Heading = styled.div`
    display:flex; 
    align-items: center;
    font-size:1.5rem;
    margin-left:20px;
    font-weight:700;
`
export const Data = styled.div`
    margin: 8px;
    border: 2px solid #000;
    box-sizing: border-box;
    border-radius: 4px;
    display: flex; 
    font-weight: 600;
    padding: 0.5rem 1rem;
`

export const Image = styled.img `
   width: 180px; 
   object-fit: cover;
   border-radius:20px; 
   padding:5px;
`

export const AddData = styled.div`
    margin: 1rem; 
    height: 107px;
    margin: 8px;
    color:black;
    display: flex; 
    :hover {
        background:white;
    }
    justify-content: center; 
    align-items: center; 
    flex-direction: column;
    font-weight: 600;
    padding: 1rem 2rem;
    font-size: 14px;
    border: 2px dashed #767676;
    border-radius: 4px;
`
