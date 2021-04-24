import React from "react";
import {
  Card,
  Header,
  SubData,
  Stats,
} from "./dasboardStyle.jsx";
import { HiLocationMarker } from "react-icons/hi";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaGlobeAmericas } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

export default function DashboardCard({
  college,
  val,
  recommendation,
  deleteCollege,
  addCollegeToList,
  ...props
}) {
  const {
    id,
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

  const iconStyle = { fontSize: "24px", marginRight: "10px" };

  const darkpink = "#853F3F";
  const palepink = "#f2b8b8";

  return (
    <Card
      color={recommendation && palepink}
      textColor={recommendation && darkpink}
    >
      <>
        <Header>
          <div>{INSTNM}</div>
          <div>
            <HiLocationMarker /> {CITY}, {STABBR}
          </div>
        </Header>
        <SubData>
          <Stats>
            <div>Acceptance Rate</div>
            <div>{ADM_RATE_ALL * 100}%</div>
          </Stats>
          {/* avg cost is a value which depends person to person so recommendation cards do not have avg_cost */}
          {AVG_COST && (
            <Stats>
              <div>Avg cost after aid</div>
              <div>${AVG_COST / 1000}K</div>
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
            <div>{ADD_NOTES ?? "no notes"}</div>
          </SubData>
        )}
        <SubData>
          <a href={`/list/${id}`}>
            <FiEdit style={iconStyle} />
          </a>
          {recommendation && (
            <AiFillPlusCircle
              style={iconStyle}
              onClick={() => addCollegeToList(college)}
            />
          )}
          <a to={INSTURL} target="_blank">
            {" "}
            <FaGlobeAmericas style={iconStyle} />
          </a>
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
