import styled from "styled-components";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaGlobeAmericas } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

const mobileSize = "768px";
const darkpink = "#853F3F";
const palepink = "#f2b8b8";
const lightpink = "#F06B6B";

export const AddIcon = styled(AiFillPlusCircle)`
  color: ${lightpink};
  font-size: 24px;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
    color: ${darkpink};
  }
`;

export const DeleteIcon = styled(AiOutlineDelete)`
  color: red;
  font-size: 24px;
  &:hover {
    cursor: pointer;
    color: ${darkpink};
  }
`;

export const EditIcon = styled(FiEdit)`
  font-size: 24px;
  &:hover {
    cursor: pointer;
    color: green;
  }
`;
export const WebsiteIcon = styled(FaGlobeAmericas)`
  font-size:20px;
  color: ${(props) => props.color ?? "black"}
  :hover {
    color:blue;
  }
`;

export const Container = styled.div`
  margin: 5rem 4rem;
  display: flex;
  flex-direction: column;
  h3 {
    display: flex;
    padding: 0.5rem 0rem;
  }
  @media only screen and (max-width: ${mobileSize}) {
    margin: 5rem 1rem;
  }
`;

export const SubContainer = styled.div`
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
  @media only screen and (max-width: ${mobileSize}) {
    flex-direction: column;
  }
`;
export const Card = styled.div`
  border: 1px solid black;
  border-radius: 0.6rem;
  display: flex;
  min-height: 8rem;
  padding: 1em;
  background: ${(props) => props.color ?? "white"};
  color: ${(props) => props.textColor ?? "black"};
  margin: 0em 1em 1em 0;
  flex-direction: column;
  width: 19rem;
  justify-content: space-between;
  box-shadow: 0px 6px 6px rgb(0 0 0 / 14%), 0px 6px 9px rgb(0 0 0 / 12%),
    6px 6px 9px rgb(0 0 0 / 20%);
  @media only screen and (max-width: ${mobileSize}) {
    padding: 1em;
    justify-content: center;
    width: 100%;
  }
`;

export const Loading = styled.div`
  display:flex;
  justify-content:center;
`

export const AddCard = styled.div`
  border: 2px dashed grey;
  border-radius: 1rem;
  display: flex;
  min-height: 10rem;
  padding: 2em;
  justify-content: center;
  align-items: center;
  margin: 0 1em 1em 0;
  max-width: 100rem;
  box-shadow: 1px 11px 9px 2px rgb(0 0 0 / 39%);
  :hover {
    background-color: ${palepink};
  }
  @media only screen and (max-width: ${mobileSize}) {
    flex-direction: column;
    padding: 1em;
    justify-content: center;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  > div:nth-child(1) {
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

export const SubData = styled.div`
  display: flex;
  margin: 0.5rem 0rem;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Stats = styled.div`
  min-width: 2rem;
  margin-right: 0.7rem;
  > div:nth-child(1) {
    font-size: 0.8rem;
  }
  > div:nth-child(2) {
    font-size: 1.2rem;
  }
`;
