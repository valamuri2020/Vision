import React, { useState, useEffect } from "react";
import {
  Container,
  Heading,
  AddCard,
  AddSubCard,
  Divider,
} from "./dasboardStyle.jsx";
import { RiAddCircleFill } from "react-icons/ri";
import { DashboardCard } from "./dashboardCard.jsx";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { RecommendationCard } from "./recommendationCard";
import { Row, Col } from "react-bootstrap";

export const Dashboard = ({ ...props }) => {
  const university = "University of Waterloo";
  const location = "somewhere in waterloo";
  const cost = "13.5k to 18.5k";
  const SATscore = 400;
  const ACTscore = 20;
  const lightpink = "#F06B6B";
  const information =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tincidunt dictum quam, sed pretium odio commodo et. Sed placerat id odio in congue. Quisque lacinia eget ex et fringilla. Suspendisse sit amet luctus diam. Integer congue";

  const value = { university, location, cost, SATscore, ACTscore, information };

  const [recommendationData, setRecommendationData] = useState([
    {
      UNITID: 100654,
      OPEID6: 1002,
      INSTNM: "Alabama A & M University",
      CITY: "Normal",
      STABBR: "AL",
      ZIP: 35762,
      INSTURL: "www.aamu.edu/",
      NPCURL:
        "www.aamu.edu/admissions-aid/tuition-fees/net-price-calculator.html",
      ADM_RATE_ALL: 0.8986,
      ACTCMMID: 18,
      ACTENMID: 17,
      ACTMTMID: 17,
      ACT_AVG: 17,
      SAT_AVG_ALL: 957,
    },
  ]);

  return (
    <>
      <Navbar />
      <Container>
        <DashboardCard value={value} />
        <DashboardCard value={value} />
        <DashboardCard value={value} />
        <Link to="/list/1">
          <AddCard>
            <AddSubCard>
              <div>
                <RiAddCircleFill
                  style={{ fontSize: "4em", color: lightpink }}
                />
              </div>
            </AddSubCard>
          </AddCard>
        </Link>
        <br />
        <br />
        <Row>
          <Col>
            <h4 style={{ color: lightpink }}>
              Recomendations Based on Your List
            </h4>
          </Col>
        </Row>
        <Row>
          <Divider />
        </Row>
        <Row>
          {recommendationData &&
            recommendationData.map((university) => (
              <Col xs={3} md={3}>
                <RecommendationCard university={university} />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};
