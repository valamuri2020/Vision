import React, { useState, useEffect } from "react";
import { Container, AddCard, AddSubCard } from "./dasboardStyle.jsx";
import { RiAddCircleFill } from "react-icons/ri";
import DashboardCard from "./dashboardCard.jsx";
import { RecommendationCard } from "./recommendationCard.jsx";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar"
import firebase from "firebase";
import { auth } from "../../firebase";

export const Dashboard = ({ ...props }) => {
  const [colleges, setColleges] = useState([]);
  const [recommendations, setRecommendations] = useState([])
  const db = firebase.firestore();

  const getUsersList = () => {
    db.collection("users").doc(auth.currentUser.uid).collection("colleges")
    .get()
    .then((response) => {
      let temp = []
      // each document manually coded a unique id assigned in firebase 
      response.forEach((doc) => {
        temp = [...temp, {...doc.data(), DOCUMENT_ID: doc.id}]
      });
      // set the list of colleges to view 
      getUsersRecommendations(temp)
      setColleges(temp)
      console.log(temp)
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const getUsersRecommendations = (colleges) => {
    console.log(colleges)
      fetch(`/recommend`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(colleges),
        })
        .then((response) => response.json())
        .then((data) => {
          console.log('first response for recommendations: ', data)
          setRecommendations(data)
        })
        .catch(err => console.log(err))
  }
    
  // when component mounts, this fetches user's list based on their unique firebase auth id
  useEffect(() => {
    getUsersList()
  }, [])

  // view college list
  const collegeCards = colleges.map((val, index) => (
    <DashboardCard college={val} key={index} />
  ));

  const recommendationCard = recommendations.map((val, index) => (
    <RecommendationCard college={val} key={index} />
  ));

  // recommendations.map((val, index) => (
  //   console.log(val)
  // ));

  console.log(recommendations)
  return (
    <>
    <Navbar/>
    <Container>
      <h3>College Recommendations</h3>
      {recommendationCard}
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
