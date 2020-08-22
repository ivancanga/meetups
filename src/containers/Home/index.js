import React, { useState, useEffect } from "react";

import Meetup from "../../components/Meetup";

import firebaseServices from "../../services/firebase-services";

import "./index.scss";

function Home() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    firebaseServices.getMeetups(setMeetups);
  }, []);

  return (
    <div className="schedule-list Home">
      <div className="schedule-list_title">
        <h4>Próximas meetups</h4>
        <p
          title="Refrescar meetups"
          className="refresh"
          onClick={() => firebaseServices.getMeetups(setMeetups)}
        ></p>
      </div>
      <div className="schedule-list_wrapper">
        {meetups.length ? (
          meetups.map((meetup, key) => <Meetup meetup={meetup} key={key} />)
        ) : (
          <p>Aún no hay meetups agendadas.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
