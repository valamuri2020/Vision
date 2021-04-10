import React, { useState, useEffect } from "react";
import { Container, AddCard, AddSubCard } from "./dasboardStyle.jsx";
import { RiAddCircleFill } from "react-icons/ri";
import DashboardCard from "./dashboardCard.jsx";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar"
import firebase from "firebase";
import { auth } from "../../firebase";

export const Dashboard = ({ ...props }) => {
  const [colleges, setColleges] = useState([]);
  const db = firebase.firestore();

  // when component mounts, this fetches user's list based on their unique firebase auth id
  useEffect(() => {
    db.collection("users").doc(auth.currentUser.uid).collection("colleges")
    .get()
    .then((response) => {
      let temp = []
      // each document manually coded a unique id assigned in firebase 
      response.forEach((doc) => {
        temp = [...temp, {...doc.data(), DOCUMENT_ID: doc.id}]
      });
      // set the list of colleges to view 
      setColleges(temp)
      console.log(temp)
    })
    .catch((error) => {
      console.error(error);
    });
  }, [])

  // view college list
  const collegeCards = colleges.map((val, index) => (
    <DashboardCard college={val} key={index} />
  ));

  return (
    <>
    <Navbar/>
    <Container>
      {collegeCards}
      <Link to="/list">
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

