import React, { useState, useEffect } from "react";
import { Container, AddCard, SubContainer } from "./dashboardStyle.jsx";
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
  const [loading, setLoading] = useState(true);
  const db = firebase.firestore();

  const getUsersList = () => {
    return db
      .collection("users")
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
        if (temp.length > 0) {
          getUsersRecommendations(temp);
        } else {
          setLoading(false);
        }
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
        // if the college exists in the users list, do not show it
        data = data.filter((val) => !colleges.includes(val));
        setRecommendations(data);
        // after recommendation is fetched, this means everything is loaded and set loading to false
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  // when component mounts, this fetches user's list based on their unique firebase auth id
  useEffect(() => {
    getUsersList();
  }, []);

  const deleteCollege = (college) => {
    const { id } = college;

    // extract the college's unique id, filter it out from the state array
    const filteredList = colleges.filter((value) => {
      return value.id !== id;
    });
    // update with the filtered array
    setColleges(filteredList);

    // find the college in the users' college collection and find by id then delete
    db.collection("users")
      .doc(auth.currentUser.uid)
      .collection("colleges")
      .doc(`${id}`)
      .delete();
  };

  // view college list
  const collegeCards = colleges.map((val, index) => (
    <DashboardCard college={val} key={index} deleteCollege={deleteCollege} />
  ));

  const recommendationCard = recommendations.map((val, index) => (
    <DashboardCard
      college={val}
      key={index}
      recommendation={true}
      deleteCollege={deleteCollege}
    />
  ));

  return (
    <>
      <Navbar />
      <Container>
        <SubContainer>
          <h3>Your List</h3>
        </SubContainer>
        <SubContainer>
          {/* if the results are still being fetched, show loading  */}
          {/* if results are fetched, show results else show nothing */}
          {loading ? (
            <LoadingCard />
          ) : (
            !loading && colleges.length > 0 && collegeCards
          )}
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
          {/* if the results are still being fetched, show loading  */}
          {/* if results are fetched but empty, show statement */}
          {/* else, show all results */}
          {loading ? (
            <LoadingCard recommendation={true} />
          ) : !loading && recommendations.length === 0 ? (
            <h4>Add colleges to your list to help you get the best matches</h4>
          ) : (
            recommendationCard
          )}
        </SubContainer>
      </Container>
    </>
  );
};
