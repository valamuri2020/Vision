import styled from "styled-components";

const mobileSize = "768px";


export const Container = styled.div`
  margin: 5rem 4rem;
  display: flex;
  flex-direction: column;
  h3 {
    display:flex;
    padding:0.5rem 0rem;
  }
  @media only screen and (max-width: ${mobileSize}) {
    margin: 5rem 1rem;
  }
`;

export const SubContainer = styled.div`
  flex-direction: row;
  display:flex;
  flex-wrap:wrap;
  @media only screen and (max-width: ${mobileSize}) {
    flex-direction:column;
  }
`
export const Card = styled.div`
  border: 1px solid black;
  border-radius: 0.6rem;
  display: flex;
  min-height: 8rem;
  padding: 1em;
  background:${props => props.color ?? 'white'};
  color:${props => props.textColor ?? 'black'};
  margin: 0em 1em 1em 0;
  flex-direction: column;
  width: 19rem;
  justify-content:space-between;
  box-shadow: 0 10px 16px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%) !important;
  @media only screen and (max-width: ${mobileSize}) {
    padding: 1em;
    justify-content: center;
    width:100%;
  }
`;

export const AddCard = styled.div`
  border: 2px dashed black;
  border-radius: 1rem;
  display: flex;
  min-height: 10rem;
  padding: 2em;
  justify-content: center;
  align-items: center;
  margin: 0 1em 1em 0;
  max-width: 100rem;
  box-shadow:1px 11px 9px 2px rgb(0 0 0 / 39%);
  @media only screen and (max-width: ${mobileSize}) {
    flex-direction: column;
    padding: 1em;
    justify-content: center;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  >div:nth-child(1) {
    font-size:1.25rem;
    font-weight:600;
  }
`;

export const SubData = styled.div`
  display:flex;
  margin: 0.5rem 0rem;
  justify-content:space-between;
  flex-wrap:wrap;
`

export const Stats = styled.div`
  min-width:2rem;
  margin-right: 0.7rem;
  >div:nth-child(1) {
    font-size:0.8rem;
  }
  >div:nth-child(2) {
    font-size:1.2rem;
  }
`