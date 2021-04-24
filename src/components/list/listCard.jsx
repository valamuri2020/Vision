import React, { useState, useEffect } from "react";
import { Card, Heading, Search, College } from "./listStyles.jsx";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { auth } from "../../firebase";

export default function ListCard({ collegeId, ...props }) {
  const db = firebase.firestore();
  const [inputValue, setInputValue] = useState();
  const [colleges, setColleges] = useState([]);
  // attribuites assigned null value such that input text values do not change from undefined to a defined
  // value, causing errors
  const [selectedCollege, setSelectedCollege] = useState({});

  const handleChange = (value, option) => {
    setSelectedCollege({ ...selectedCollege, [option]: value });
  };

  const handleFilter = () => {
    if (inputValue) {
      // changes the input value by user such that search is not case sensitive
      // input: university of waterloo, input to compare: University of Waterloo
      // data in the db cannot be changed to case-insensitive

      let inputValueToCompare = inputValue
        .split(" ")
        .map((word) => {
          // if the value contains word 'of', keep it unchanged
          if (word === "of") return "of";
          return word[0].toUpperCase() + word.substring(1);
        })
        .join(" ");

      db.collection("colleges")
        .where("INSTNM", "==", inputValueToCompare)
        .get()
        .then((response) => {
          let temp = [];
          response.forEach((doc) => {
            temp = [...temp, { ...doc.data() }];
          });
          setColleges(temp);
          console.log(colleges);
        });
    }
  };

  const handleSubmit = () => {
    const Ref = db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("colleges");

    if (collegeId) {
      // find the college user wants to edit by id and update info based on user input in this form
      Ref.doc(`${collegeId}`)
        .set(selectedCollege)
        .then(() => {
          console.log("edited college document successfully");
        })
        .catch((err) => console.log(err));
      return;
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
      db.collection("users")
        .doc(auth.currentUser.uid)
        .collection("colleges")
        .doc(`${collegeId}`)
        .get()
        .then((response) => {
          console.log(response.data());
          setSelectedCollege(response.data());
        });
    }
  }, []);

  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Heading>University</Heading>
          <Search>
            {/* if the user has already selected a university or wants to edit an info of a uni from dashboard, prefill name here */}
            <Input
              onChange={(e) => setInputValue(e.target.value)}
              value={selectedCollege?.["INSTNM"]}
            />
            <Button style={{ marginLeft: "0.5em" }} onClick={handleFilter}>
              {" "}
              Submit{" "}
            </Button>
          </Search>
          {colleges?.map((college, key) => {
            return (
              <College key={key} onClick={() => setSelectedCollege(college)}>
                {college["INSTNM"]}
              </College>
            );
          })}
        </FormGroup>
        <FormGroup>
          <Heading>Location</Heading>
          <Input
            value={selectedCollege?.["CITY"]}
            onChange={(e) => handleChange(e.target.value, "CITY")}
          />
        </FormGroup>
        <FormGroup>
          <Heading>AVG Cost</Heading>
          {/* if university is selected, show finance calculator for applicable institute and let users calculate it for themselves*/}
          {selectedCollege?.length > 0 && (
            <div>
              To find out the estimated costs for you, visit the institute's
              official website: <a>{selectedCollege?.["NPCURL"]}</a>
            </div>
          )}
          <Input
            value={selectedCollege?.["AVG_COST"]}
            onChange={(e) => handleChange(e.target.value, "AVG_COST")}
          />
        </FormGroup>
        <FormGroup>
          <Heading>AVG SAT</Heading>
          <Input
            value={selectedCollege?.["SAT_AVG_ALL"]}
            onChange={(e) => handleChange(e.target.value, "SAT_AVG_ALL")}
          />
        </FormGroup>
        <FormGroup>
          <Heading>AVG ACT</Heading>
          <Input
            value={selectedCollege?.["ACT_AVG"]}
            onChange={(e) => handleChange(e.target.value, "ACT_AVG")}
          />
        </FormGroup>
        <FormGroup>
          <Heading>Acceptance %</Heading>
          <Input
            value={selectedCollege?.["ADM_RATE_ALL"]}
            onChange={(e) => handleChange(e.target.value, "ADM_RATE_ALL")}
          />
        </FormGroup>
        <FormGroup>
          <Heading> Additional Notes </Heading>
          <Input
            type="textarea"
            value={selectedCollege?.["ADD_NOTES"]}
            onChange={(e) => handleChange(e.target.value, "ADD_NOTES")}
          />
        </FormGroup>
      </Form>
      {/* if there is no selected college, do not let users submit blank information */}
      {selectedCollege?.["INSTNM"] !== undefined ? (
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
      ) : (
        <Link to="/">
          <Button
            size="lg"
            block
            style={{ margin: "10px 0px" }}
            color="danger"
            disabled
          >
            Submit
          </Button>
        </Link>
      )}
    </Card>
  );
}
