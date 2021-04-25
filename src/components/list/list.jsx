import React from "react";
import { Container } from "../dashboard/dasboardStyle.jsx";
import ListCard from "./listCard.jsx";
import Navbar from "../Navbar/Navbar";
import {
  BrowserRouter as Router,
  useLocation,
  useParams,
} from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const List = (props) => {
  let query = useQuery();

  // unique id for each college in the list is passed
  // in the query. use this to get prefilled info in the listcard component
  const { id } = useParams();
  // if the user is adding a recommended university to their list, the name of college is passed as a query
  const name = query.get("name");

  return (
    <>
      <Navbar />
      <Container>
        <ListCard collegeId={id} name={name} />
      </Container>
    </>
  );
};
