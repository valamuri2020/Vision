import React from "react";
import { Card, Loading } from "./dashboardStyle.jsx";
import { Spinner } from "reactstrap";

export default function LoadingCard({ recommendation }) {
  const darkpink = "#853F3F";
  const palepink = "#f2b8b8";

  return (
    <Card
      color={recommendation && palepink}
      textColor={recommendation && darkpink}
    >
      <Loading>
        <Spinner color="danger" />
      </Loading>
    </Card>
  );
}
