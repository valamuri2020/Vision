import React, { useState, useEffect } from "react";
import { Container, AddCard, SubContainer } from "./dasboardStyle.jsx";
import { RiAddCircleFill } from "react-icons/ri";
import DashboardCard from "./dashboardCard.jsx";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import firebase from "firebase";
import { auth } from "../../firebase";
import LoadingCard from "./LoadingCard.jsx";

export const Dashboard = ({ ...props }) => {
  const [colleges, setColleges] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const db = firebase.firestore();

  const getUsersList = () => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("colleges")
      .get()
      .then((response) => {
        let temp = [];
        // each document manually coded a unique id assigned in firebase
        response.forEach((doc) => {
          temp = [...temp, { ...doc.data(), id: doc.id }];
        });
        // set the list of colleges to view
        getUsersRecommendations(temp);
        setColleges(temp);
        console.log(temp);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getUsersRecommendations = (colleges) => {
    fetch(`/recommend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(colleges),
    })
      .then((response) => response.json())
      .then((data) => {
        setRecommendations(data);
      })
      .catch((err) => console.log(err));
  };

  // when component mounts, this fetches user's list based on their unique firebase auth id
  useEffect(() => {
    getUsersList();
  }, []);

  const deleteCollege = (college) => {
    const { id } = college;

    const filteredList = colleges.filter((value) => {
      return value.id !== id;
    });

    setColleges(filteredList);

    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("colleges")
      .doc(`${id}`)
      .delete();
  };

  const addCollegeToList = (college) => {
    const add = [...colleges, college];

    setColleges(add);

    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("colleges")
      .add(college)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  // view college list
  const collegeCards = colleges.map((val, index) => (
    <DashboardCard
      deleteCollege={deleteCollege}
      addCollegeToList={addCollegeToList}
      college={val}
      key={index}
    />
  ));

  const recommendationCard = recommendations.map((val, index) => (
    <DashboardCard
      deleteCollege={deleteCollege}
      addCollegeToList={addCollegeToList}
      college={val}
      key={index}
      recommendation={true}
    />
  ));

  const loadingCards = <LoadingCard recommendation={true} />;

  return (
    <>
      <Navbar />
      <Container>
        <SubContainer>
          <h3>Your List</h3>
        </SubContainer>
        <SubContainer>
          {colleges.length > 0 ? collegeCards : loadingCards}
          <AddCard>
            <Link to="/list">
              <RiAddCircleFill style={{ fontSize: "4em", color: "#F06B6B" }} />
            </Link>
          </AddCard>
        </SubContainer>
        <SubContainer>
          <h3>College Recommendations</h3>
        </SubContainer>
        <SubContainer>
          {recommendations.length > 0 ? recommendationCard : loadingCards}
        </SubContainer>
      </Container>
    </>
  );
};
