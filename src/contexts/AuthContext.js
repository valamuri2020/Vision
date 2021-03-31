import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import firebase from "firebase";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const db = firebase.firestore();

  const signUp = (email, password) => {
    auth.createUserWithEmailAndPassword(email, password).then(() => {
      db.collection("users")
        .doc(auth.currentUser.uid)
        .set({
          email: email,
        })
        //ensure we catch any errors at this stage to advise us if something does go wrong
        .catch((error) => {
          console.log(
            "Something went wrong with added user to firestore: ",
            error
          );
        });
    });
  };
  const login = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

  const logout = () => auth.signOut();

  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    login,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
