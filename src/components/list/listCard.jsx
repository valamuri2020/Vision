import React, { useEffect, useState } from "react";
import { Card, Element, Heading } from "./listStyles.jsx";
import { FormGroup, Button, Input } from "reactstrap";
import { Link } from "react-router-dom";
import firebase from "firebase";

export default function ListCard() {
  const db = firebase.firestore();
  const [colleges, setColleges] = useState();

  useEffect(() => {
    const temp = [];
    db.collection("colleges")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          temp.push(doc.data());
        });
        setColleges(temp);
        // TODO remove console logs if not needed
        console.log("temp", temp);
        console.log("state", colleges);
      });
  }, []);

  const handleSubmit = () => {
    console.log("clicked");
    db.collection("users")
      // TODO need to make all these fields values form the inputs, not hardcoded
      // TODO add uid logic so that this specific user's list is updated and not all users
      .add({
        name: "ui test",
        location: "some random place",
        avg_cost: 1738,
        avg_act: 21,
        avg_sat: 1300,
        acceptance_rate: 0.23,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  return (
    <Card>
      <Element>
        <Heading>University</Heading>
        <FormGroup>
          <Input type="select">
            {colleges &&
              colleges.map((college) => {
                return <option>{college.name}</option>;
              })}
          </Input>
        </FormGroup>
      </Element>
      <Element>
        <Heading>Location</Heading>
        <Input />
      </Element>
      <Element>
        <Heading>AVG Cost</Heading>
        <Input />
      </Element>
      <Element>
        <Heading>AVG SAT</Heading>
        <Input />
      </Element>
      <Element>
        <Heading>AVG ACT</Heading>
        <Input />
      </Element>
      <Element>
        <Heading>Acceptance %</Heading>
        <Input />
      </Element>
      <Link to="/">
        <Button
          size="lg"
          block
          style={{ margin: "10px 0px" }}
          color="danger"
          onClick={handleSubmit}
        >
          {/* color='#F06B6B' for button does not work as expected */}
          Submit
        </Button>
      </Link>
    </Card>
  );
}
