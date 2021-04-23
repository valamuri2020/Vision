import React from "react";
import {
  Content,
  Card,
  Information,
  Header,
  SubData,
  Stats,
  Button,
} from "./dasboardStyle.jsx";
import { HiLocationMarker } from "react-icons/hi";
import { SiGooglescholar } from "react-icons/si";
import { MdMonetizationOn } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import firebase from "firebase";
import { auth } from "../../firebase";
import { AiOutlineDelete } from "react-icons/ai"
// import { Button } from 'react-bootstrap'
import { BsBookHalf, BsTrashFill } from "react-icons/bs";

export default function DashboardCard({ college, ...props }) {
  const {
    DOCUMENT_ID,
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
  const db = firebase.firestore();

  const deleteCollege = () => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("colleges")
      .doc(`${DOCUMENT_ID}`)
      .delete()
      .then(() => {
        // refresh the page after user deletes a college from list
        window.location.reload(false);
      });
  };
  return (
    <Card>
      {/* <Content>
            <h3>{INSTNM}</h3>
            <HiLocationMarker/> {CITY}, {STABBR}
            <FaEdit style={iconStyle}/>
            <BsTrashFill style={iconStyle}/>
          </Content>
          <Content> <SiGooglescholar style={iconStyle}/> Acceptance Rate: {ADM_RATE_ALL * 100}% </Content>
          <Content color={"#46b3e6"}> <MdMonetizationOn style={iconStyle}/> Average Yearly Tuition: ${AVG_COST}</Content>
          <Content color={"#30c735"}> <BsBookHalf style={iconStyle}/> Average ACT Score: {ACT_AVG}</Content>
          <Content color={"#30c735"}> <BsBookHalf style={iconStyle}/> Average SAT Score: {SAT_AVG_ALL}</Content>
          <Content>{ADD_NOTES ?? ``}</Content> */}
      <Header>
        <div>Stanford University</div>
        <div>Stanford, CA</div>
      </Header>
      <SubData>
        <Stats>
          <div>Acceptance Rate</div>
          <div>30%</div>
        </Stats>
        <Stats>
          <div>Avg cost after aid</div>
          <div>$30k</div> 
        </Stats>
        <Stats>
          <div>Avg ACT</div>
          <div>30</div> 
        </Stats>
        <Stats>
          <div>Avg SAT</div>
          <div>3030</div> 
        </Stats>
      </SubData>
      <SubData>
        <FiEdit style={iconStyle}/>
        <AiOutlineDelete style={iconStyle}/>
      </SubData>
    </Card>
  );
}
