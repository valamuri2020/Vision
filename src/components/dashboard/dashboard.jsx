import React, { useState, useEffect } from "react";
import { Container, AddCard, AddSubCard } from "./dasboardStyle.jsx";
import { RiAddCircleFill, RiContactsBookLine } from "react-icons/ri";
import DashboardCard from "./dashboardCard.jsx";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar"
import firebase from "firebase";
import { auth } from "../../firebase";

export const Dashboard = ({ ...props }) => {
  const [colleges, setColleges] = useState([]);
  const db = firebase.firestore();

  useEffect(() => {
    db.collection("users").doc(auth.currentUser.uid).collection("colleges")
    .get()
    .then((response) => {
      let temp = []
      response.forEach((doc) => {
        temp = [...temp, {...doc.data() }]
      });
      setColleges(temp)
      console.log(colleges)
    })
    .catch((error) => {
      console.error(error);
    });
  }, [])

  const painOptionDivs = colleges.map((val) => (
    <DashboardCard college={val} />
  ));

  return (
    <>
    <Navbar/>
    <Container>
      {painOptionDivs}
      <Link to="/list/1">
        <AddCard>
          <AddSubCard>
              <RiAddCircleFill style={{ fontSize: "4em", color: "#F06B6B" }} />
          </AddSubCard>
        </AddCard>
      </Link>
    </Container>
    </>
  );
};

