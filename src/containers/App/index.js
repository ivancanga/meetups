import React, { useState } from "react";

import firebaseServices from "../../services/firebase-services";

import Header from "../Header";
import Home from "../Home";
import Register from "../Register";
import Login from "../Login";

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  const [auth, setAuth] = useState({ isAuth: false });

  const onLogin = (id) => {
    firebaseServices.loginUser(id, setAuth);
  };

  return (
    <Router>
      <Header auth={auth} />
      {auth.isAuth ? (
        <Route
          path="/"
          exact
          component={() => <Home dataUser={auth.dataUser} />}
        />
      ) : (
        <Route path="/" exact component={() => <Login onLogin={onLogin} />} />
      )}

      <Route path="/register" exact component={Register} />
    </Router>
  );
};

export default App;
