import React, { useState, useEffect } from "react";
import { Card, Element, Heading, Search, College } from "./listStyles.jsx";
import { Button, Input } from "reactstrap";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { auth } from "../../firebase";

export default function ListCard({ collegeId, ...props }) {
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
    
    const Ref = db.collection("users").doc(auth.currentUser.uid).collection("colleges")

    if (collegeId) {
      // find the college user wants to edit by id and update info based on user input in this form
      Ref.doc(`${collegeId}`)
      .set(selectedCollege)
      .then(() => {
        console.log('edited college document successfully')
      })
      .catch(err => console.log(err))
      return
    }

    // creates or finds a doc with the user id logged in, saves a college doc within the user doc
    Ref.add(selectedCollege)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  useEffect(() => {
    // if a collegeId is passed as a parameter, prefill the text boxes with college info
    // find the college selected by finding the unique document id for the college in the user's list
    if (collegeId) {
      db.collection("users").doc(auth.currentUser.uid).collection("colleges").doc(`${collegeId}`)
      .get()
      .then((response) => {
        console.log(response.data())
        setSelectedCollege(response.data())
      })
    }
  }, [])


  return (
    <Card>
      <Element>
        <Heading>University</Heading>
        <Search>
          {/* if the user has already selected a university or wants to edit an info of a uni from dashboard, prefill name here */}
          <Input onChange={(e) => setInputValue(e.target.value)} value={selectedCollege?.["INSTNM"]}/>
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
        {/* if university is selected, show finance calculator for applicable institute */}
        { selectedCollege.length > 0 && <div>
          To find out the estimated costs for you, visit the institute's official website: <a>{selectedCollege?.["NPCURL"]}</a>
        </div>}
        <Input value={selectedCollege?.["AVG_COST"]} onChange={(e) => {setSelectedCollege({...selectedCollege, AVG_COST: e.target.value})}}/>
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
      <Element>
        <Heading> Additional Notes </Heading>
        <Input type="textarea" value={selectedCollege?.["ADD_NOTES"]} onChange={(e) => {setSelectedCollege({ADD_NOTES: e.target.value})}}/>
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
