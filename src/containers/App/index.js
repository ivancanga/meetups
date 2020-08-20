import React, { useState } from "react";

import firebase from "../../config/firebase";

import Home from "../Home";
import HomeAdmin from "../HomeAdmin";
import Register from "../Register";
import Login from "../Login";

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  const [auth, setAuth] = useState({ isAuth: false });

  const onLogin = (id) => {
    firebase.db
      .doc(`users/${id}`)
      .get()
      .then((doc) => {
        setAuth({ isAuth: true, dataUser: doc.data() });
      });
  };

  return (
    <Router>
      {auth.isAuth ? (
        <Route
          path="/"
          exact
          component={() =>
            !auth.dataUser.admin ? <Home dataUser={auth.dataUser} /> : <HomeAdmin />
          }
        />
      ) : (
        <Route path="/" exact component={() => <Login onLogin={onLogin} />} />
      )}

      <Route path="/register" exact component={Register} />
    </Router>
  );
};

export default App;
