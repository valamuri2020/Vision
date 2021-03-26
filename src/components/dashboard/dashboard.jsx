import React from "react";
import { Container, Heading, AddCard, AddSubCard } from "./dasboardStyle.jsx";
import { RiAddCircleFill } from "react-icons/ri";
import DashboardCard from "./dashboardCard.jsx";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar"

export const Dashboard = ({ ...props }) => {
  const university = "University of Waterloo";
  const location = "somewhere in waterloo";
  const cost = "13.5k to 18.5k";
  const score = 40;
  const information =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt dictum quam, sed pretium odio commodo et. Sed placerat id odio in congue. Quisque lacinia eget ex et fringilla. Suspendisse sit amet luctus diam. Integer congue";

  const value = { university, location, cost, score, information };
  return (
    <>
    <Navbar/>
    <Container>
      <DashboardCard value={value} />
      <DashboardCard value={value} />
      <DashboardCard value={value} />
      <Link to="/list/1">
        <AddCard>
          <AddSubCard>
            <div>
              <RiAddCircleFill style={{ fontSize: "4em", color: "#F06B6B" }} />
            </div>
          </AddSubCard>
        </AddCard>
      </Link>
    </Container>
    </>
  );
};

