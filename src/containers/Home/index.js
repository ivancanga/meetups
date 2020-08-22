import React, { useState, useEffect } from "react";

import Meetup from "../../components/Meetup";

import firebaseServices from "../../services/firebase-services";

import "./index.scss";

function Home() {
  const [meetups, setMeetups] = useState([]);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    firebaseServices.getMeetups(setMeetups, setUpdating);
  }, []);

  return (
    <div className="schedule-list Home">
      <div className="schedule-list_title">
        <h4>Próximas meetups</h4>
        <p
          title="Refrescar meetups"
          className="refresh"
          onClick={() => firebaseServices.getMeetups(setMeetups, setUpdating)}
        ></p>
      </div>
      <div className="schedule-list_wrapper">
        {updating ? (
          <div className="updater"></div>
        ) : meetups.length ? (
          meetups.map((meetup, key) => (
            <Meetup meetup={meetup} key={key} admin={true} />
          ))
        ) : (
          <p>Aún no hay meetups agendadas.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
