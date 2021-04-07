import React from "react";
import {
  SubCard,
  Content,
  Card,
  Text,
  Image,
  Information,
} from "./dasboardStyle.jsx";
import logo from "./waterloo-logo.jpg";

export const DashboardCard = ({ value, ...props }) => {
  const { university, location, cost, SATscore, ACTscore, information } = value;
  return (
    <Card>
      <Image src={logo} />
      <SubCard>
        <h3>{university}</h3>
        <Content> {location} </Content>
        <Information>
          <div>
            <Content color={"#46b3e6"}>{cost}</Content>
            <Content color={"#30c735"}>Average SAT: {SATscore}</Content>
            <Content color={"#30c735"}>Average ACT: {ACTscore}</Content>
          </div>
          <div>
            <Text>{information}</Text>
          </div>
        </Information>
      </SubCard>
    </Card>
  );
}
