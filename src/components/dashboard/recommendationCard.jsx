import React from "react";
import {
  CardContainer,
  CardHeader,
  DataLabel,
  Data,
  AddIcon,
} from "./recommendationCardStyles";

export const RecommendationCard = ({college}) => {
  const addRecommendation = () => {
    console.log("added");
  }
  return (
    <CardContainer>
      <CardHeader>{college?.INSTNM}</CardHeader>
      <DataLabel>
        {college?.CITY}, {college?.STABBR}
      </DataLabel>
      <br />
      <DataLabel>Acceptance: </DataLabel>
      <Data>{college?.ADM_RATE_ALL * 100 + "%"}</Data>
      <div style={{ textAlign: "right" }} onClick={addRecommendation}>
        <AddIcon />
      </div>
    </CardContainer>
  );
};
