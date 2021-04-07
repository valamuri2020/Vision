import React from "react";
import {
  CardContainer,
  CardHeader,
  DataLabel,
  Data,
  AddIcon,
} from "./recommendationCardStyles";

export const RecommendationCard = (props) => {
  const { university } = props;
  const addRecommendation = () => {
    console.log("added");
  }
  return (
    <CardContainer>
      <CardHeader>{university.INSTNM}</CardHeader>
      <DataLabel>
        {university.CITY}, {university.STABBR}
      </DataLabel>
      <br />
      <DataLabel>Acceptance: </DataLabel>
      <Data>{university.ADM_RATE_ALL * 100 + "%"}</Data>
      <div style={{ textAlign: "right" }} onClick={addRecommendation}>
        <AddIcon />
      </div>
    </CardContainer>
  );
};
