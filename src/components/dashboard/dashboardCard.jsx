import React from "react";
import {
  Card,
  Header,
  SubData,
  Stats,
  AddIcon,
  WebsiteIcon,
  EditIcon,
  DeleteIcon,
} from "./dashboardStyle.jsx";
import { HiLocationMarker } from "react-icons/hi";
import { useHistory } from "react-router-dom";

export default function DashboardCard({
  college,
  val,
  recommendation,
  addCollegeToList,
  deleteCollege,
  ...props
}) {
  const {
    UNITID,
    INSTNM,
    CITY,
    ADM_RATE_ALL,
    STABBR,
    AVG_COST,
    SAT_AVG_ALL,
    INSTURL,
    ACT_AVG,
    ADD_NOTES,
  } = college;

  const darkpink = "#853F3F";
  const palepink = "#f2b8b8";

  const history = useHistory();
  const params = new URLSearchParams();

  const navigatoToList = () => {
    params.append("name", `${INSTNM}`);
    // if the user wants to add an institution from recommendation, navigate to list and then allow addition
    // to find the selected uni, the name is sent as a query
    history.push({ pathname: "/list", search: params.toString() });
  };

  return (
    <Card
      color={recommendation && palepink}
      textColor={recommendation && darkpink}
    >
      <>
        <Header>
          <div>
            {INSTNM}{" "}
            <a href={INSTURL} target="_blank">
              {recommendation ? (
                <WebsiteIcon color={darkpink} />
              ) : (
                <WebsiteIcon/>
              )}
            </a>
          </div>
          <div>
            <HiLocationMarker /> {CITY}, {STABBR}
          </div>
        </Header>
        <SubData>
          <Stats>
            <div>Acceptance Rate</div>
            <div>{(ADM_RATE_ALL * 100).toFixed(2)}%</div>
          </Stats>
          {/* avg cost is a value which depends person to person so recommendation cards do not have avg_cost */}
          {AVG_COST && (
            <Stats>
              <div>Your cost after aid</div>
              <div>${parseInt(AVG_COST)}K</div>
            </Stats>
          )}
          <Stats>
            <div>Avg ACT</div>
            <div>{Math.floor(ACT_AVG)}</div>
          </Stats>
          <Stats>
            <div>Avg SAT</div>
            <div>{SAT_AVG_ALL}</div>
          </Stats>
        </SubData>
        {!recommendation && (
          <SubData>
            <div>{ADD_NOTES ?? ""}</div>
          </SubData>
        )}
        <SubData>
          {!recommendation && (
            <a href={`/list/${UNITID}`}>
              <EditIcon />
            </a>
          )}
          {recommendation && <AddIcon onClick={navigatoToList} />}
          {!recommendation && (
            <DeleteIcon onClick={() => deleteCollege(college)} />
          )}
        </SubData>
      </>
    </Card>
  );
}
