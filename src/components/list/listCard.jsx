import React, { useState } from "react";
import { Card, Element, Heading, Search, College } from "./listStyles.jsx";
import { Button, Input} from "reactstrap";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { auth } from "../../firebase";

export default function ListCard() {
  const db = firebase.firestore();
  const [inputValue, setInputValue] = useState();
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState([]);

  const handleFilter = () => {
    if (inputValue) {
      db.collection("colleges")
      .where('INSTNM', '==', inputValue)
      .get()
      .then((response) => {
        let temp = [];
        response.forEach((doc) => {
          temp = [...temp, {...doc.data()}]
        });
        setColleges(temp)
        console.log(colleges)
      })
    }
  };

  const handleSubmit = () => {
    db.collection("users").doc(auth.currentUser.uid).collection("colleges")
      // creates or finds a doc with the user id logged in, saves a college doc within the user doc
      .add(selectedCollege)
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
        <Search>
          <Input onChange={(e) => setInputValue(e.target.value)}/>
          <Button style={{ marginLeft: '0.5em' }} onClick={handleFilter}> Submit </Button>
        </Search>
        {colleges?.map((college, key) => {
            return ( 
              <College key={key} onClick={() => setSelectedCollege(college)}> 
                {college['INSTNM']} 
              </College>
            )
        })}
      </Element>
      <Element>
        <Heading>Location</Heading>
        <Input value={selectedCollege?.["CITY"]} onChange={(e) => {setSelectedCollege({...selectedCollege, AVG_COST: e.target.value})}}/>
      </Element>
      <Element>
        <Heading>AVG Cost</Heading>
        <Input onChange={(e) => {setSelectedCollege({...selectedCollege, AVG_COST: e.target.value})}}/>
      </Element>
      <Element>
        <Heading>AVG SAT</Heading>
        <Input value={selectedCollege?.["SAT_AVG_ALL"]} onChange={(e) => {setSelectedCollege({SAT_AVG_ALL: e.target.value})}}/>
      </Element>
      <Element>
        <Heading>AVG ACT</Heading>
        <Input value={selectedCollege?.["ACT_AVG"]} onChange={(e) => {setSelectedCollege({ACT_AVG: e.target.value})}}/>
      </Element>
      <Element>
        <Heading>Acceptance %</Heading>
        <Input value={selectedCollege?.["ACTENMID"]} onChange={(e) => {setSelectedCollege({ACTENMID: e.target.value})}}/>
      </Element>
        <Link to="/">
          <Button
            size="lg"
            block
            style={{ margin: "10px 0px" }}
            color="danger"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Link>
    </Card>
  );
}
