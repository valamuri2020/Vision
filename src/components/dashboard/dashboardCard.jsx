import React from "react";
import {
  SubCard,
  Content,
  Card,
  Text,
  Image,
  Information,
} from "./dasboardStyle.jsx";

export default function DashboardCard({ college, ...props }) {
  const { INSTNM, CITY, ADM_RATE_ALL, STABBR, AVG_COST, SAT_AVG_ALL, INSTURL, ACT_AVG } = college;

  console.log('hello')
  return (
    <Card>
      <SubCard>
        <a href={INSTURL}><h3>{INSTNM}</h3></a>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <Information>
            <Content> Location: {CITY}, {STABBR} </Content>
            <Content> Acceptance Rate: {ADM_RATE_ALL * 100}% </Content>
          </Information>
          <Information>
            <div>
              <Content color={"#46b3e6"}>Average Yearly Tuition: ${AVG_COST}</Content>
              <Content color={"#30c735"}>Average ACT/SAT Score: {ACT_AVG}/{SAT_AVG_ALL}</Content>
            </div>
          </Information>
        </div>
      </SubCard>
    </Card>
  );
}
