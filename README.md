## Inspiration

Planning your college list is one of the most exciting and important parts of your life as a high school student. We saw that there weren't any easy, intuitive tools available to craft our lists. Many of our peers used spreadsheets, paper notes and text documents. It would have also been very beneficial for us to know about other colleges similar to those in our lists.

## What it does

Enter Vision. Sign up with your email to easily find and add the colleges you want in two clicks. Vision will autocomplete all relevant fields such as average SAT/ACT, acceptance rate, provide links to the institution's website and their financial aid page. A key aspect of this project is the content-based recommendation system with Machine Learning. This algorithm takes the colleges in the user's list as inputs to find and then recommend the most similar colleges.

#### Features:

- Sign in, register and forgot password functionality using Firebase
- Firestore is used to create user lists, edit their notes, delete colleges from lists and store all college data
- Machine Learning algorithm using Sci-kit Learn combined with a RESTful API in Flask to recommend colleges
- An intuitive and engaging user interface, search functionality, and routing with React, Firebase and Bootstrap

## Demo
- - - -
### Register
![Register](/gifs/register.gif)
### Sign In
![Register](/gifs/sign_in.gif)
### Add a College
![Add a College](/gifs/add_college.gif)
### Add a Recommendation
![Add a Recommendation](/gifs/add_recommendation.gif)
### Edit a College
![Edit a College](/gifs/edit_college.gif)
### Delete a College
![Delete a College](/gifs/delete_college.gif)
### Sign Out
![Sign Out](/gifs/sign_out.gif)
- - - -
## How we built it

We used a variety of software development practices over the duration of this project. Firstly, using Git for version control proved incredibly useful. It allowed us to delegated tasks and work on separate portions to guarantee smooth collaboration.

The app boasts authentication with email and passoword powered by Firebase. Firebase Cloud Firestore also served as our database which allowed us to connect the current user with their data. When a user updates their list through the responsive React frontend, those changes are immediately reflected in the database.

After finding college data from the U.S. Department of Education, we converted that data into JSON format and mass uploaded it to the database using a Node.js script and Firebase Admin permissions.

Users can easily search for a specific university they want to add by using a search bar. To retrieve this, we use a simple Cloud Firestore query which finds by the institute's name.

User data is sent to the ML algorithm when the dashboard has loaded through a REST API built using Flask. It responds with the recommendations which are then displayed in pink underneath the user's list.

## Challenges we overcame

We connected the Machine Learning component to the React front end by utilizing Flask, a back-end python framework. Our Flask implementation is a REST API which stores our machine learning python scripts. This allows users to make a POST request with their college list and retrieve back a list of recommendations.

Challenges we ran into while acheving this were CORS or Cross-Origin Resourcing Sharing errors. We had to delve deep into the our package.json file and add a proxy attribute to solve this. On the backend, we had to research and tinker with the Flask API to resolve the CORS error.

We are very glad to have each other to help overcome challenges, debug and we certainly learnt a lot and had fun with it throughout!

## Accomplishments we are proud of

We are very proud of applying our machine learning knowledge and coming up with the recommendation system on our own! We are also very proud of designing a clean, interactive UI that allows for an intuitive user flow from logging in to adding a new college!

## What we learned

We learned new frameworks such as Firebase, Flask, Sci-kit Learn, how to integrate them together, and most significantly, how to design a recommender system and connect it to the UI.

Technologies used in this project:

- React
- Firebase
- Flask
- Pandas
- Sci-kit Learn
- Seaborn
- Node.js
- Bootstrap
- Ant Design

## What's next for Vision

We would like to improve the search bar to have a dropdown as the user is typing and perhaps incorporate autocomplete using NLP.
