import styled from "styled-components";
import { Container } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

const gray = "#ccc";
const darkpink = "#853F3F";
const lightpink = "#F06B6B";
const palepink = "#f2b8b8";

export const CardContainer = styled(Container)`
  background-color: ${palepink};
  padding-top: 6px;
  padding-bottom: 6px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12),
    0px 3px 3px rgba(0, 0, 0, 0.2);
  border: 0.5px solid ${darkpink};
  border-radius: 6px;
  margin: 8px 0px;
`;
export const CardHeader = styled.h5`
  color: ${darkpink};
`;
export const DataLabel = styled.span`
  font-weight: bold;
`;

export const Data = styled.span`
  color: #000;
`;

export const AddIcon = styled(FaPlus)`
  font-size: 1rem;
  color: ${darkpink};
  position: absolute;
  top: 1vh;
  right: 1.5vw;

  &:hover {
    cursor: pointer;
  }
}
`;
