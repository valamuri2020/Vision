import React from "react";
import { Card, Header, SubData, Stats } from "./dashboardStyle.jsx";
import { HiLocationMarker } from "react-icons/hi";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaGlobeAmericas } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
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

  const iconStyle = {
    fontSize: "20px",
    marginRight: "10px",
    color: recommendation && darkpink,
  };

  const history = useHistory();
  const params = new URLSearchParams();

  const navigatoToList = () => {
    params.append("name", `${INSTNM}`);
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
              <FaGlobeAmericas style={iconStyle} />
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
              <FiEdit style={iconStyle} />
            </a>
          )}
          {recommendation && (
            <AiFillPlusCircle style={iconStyle} onClick={navigatoToList} />
          )}
          {!recommendation && (
            <AiOutlineDelete
              style={{ ...iconStyle, color: "red" }}
              onClick={() => deleteCollege(college)}
            />
          )}
        </SubData>
      </>
    </Card>
  );
}
