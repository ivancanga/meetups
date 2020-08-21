import React, { useState, useEffect } from "react";
import DatePicker from "../../components/DatePicker";
import { Tooltip } from "@material-ui/core";

import firebase from "../../config/firebase";

import "./index.scss";

function HomeAdmin() {
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    getMeetups();
  }, []);

  const getMeetups = () => {
    const meetups = [];
    firebase.db
      .collection("/meetups")
      .where("date", ">", new Date(Date.now()))
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          meetups.push(doc.data());
        });
        getWeather(meetups).then((meetups) => setMeetups(meetups));
      });
  };

  // Refactor variables en .env
  const api = {
    base: "https://api.openweathermap.org/data/2.5/onecall",
    location: "lat=-34.5780655&lon=-58.4265317",
    key: "967884c26af641b5f50d89fe95b68545",
  };

  const getWeather = (meetups) => {
    const now = new Date();
    const oneWeekFromNow = new Date().setDate(now.getDate() + 7);

    const weather = fetch(
      `${api.base}?APPID=${api.key}&${api.location}&units=metric&exclude=current,minutely,hourly`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const meetupsWeather = [];
        meetups.forEach((i) => {
          let timestamp = i.date.seconds * 1000;
          console.log(i, timestamp);
          // If day is in range of 7 days (api limit) until now
          if (timestamp < oneWeekFromNow) {
            // Getting day number for obtain value from weather object index
            let day =
              new Date(timestamp).getUTCDate() - new Date().getUTCDate();
            console.log(day);
            i.temp = data.daily[day].temp;
          }
          meetupsWeather.push(i);
        });
        return meetupsWeather;
      });
    return weather;
  };

  let dataForm = {
    name: "",
    description: "",
  };

  const [form, setForm] = useState(dataForm);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    setLoading(!loading);
    e.preventDefault();
    form.date = selectedDate;
    form.assistants = [];
    firebase.db
      .collection("meetups")
      .doc()
      .set({
        ...form,
      })
      .then(() => {
        console.log("Meetup agendada a la base de datos.");
        getMeetups();
        setLoading(loading);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="schedule-admin Home">
        <div className="schedule-admin_title">
          <h4>Agendar nueva meetup</h4>
        </div>
        <div className="schedule-admin_wrapper">
          <div className="schedule wrapper">
            <p className="schedule_title icon">
              Elegí una fecha para el evento
            </p>
            <DatePicker setSelectedDate={setSelectedDate} />
          </div>

          <form className="form wrapper" onSubmit={handleSubmit}>
            <p className="form_title icon">Agregá un título y descripción</p>
            <input
              id="name"
              name="name"
              placeholder="Nombre del meetup"
              autoComplete="off"
              onChange={handleChange}
              value={form.name}
            />
            <textarea
              id="description"
              name="description"
              placeholder="Descripcion del meetup"
              autoComplete="off"
              onChange={handleChange}
              value={form.description}
            />
            <button
              style={
                form.name && form.description
                  ? { backgroundColor: "#a87640" }
                  : {}
              }
              type="submit"
            >
              {loading ? (
                <div className="loader"></div>
              ) : (
                <span>Agendar meetup</span>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="schedule-list Home">
        <div className="schedule-list_title">
          <h4>Meetups agendadas</h4>
          <p
            title="Refrescar meetups"
            className="refresh"
            onClick={() => getMeetups()}
          ></p>
        </div>
        <div className="schedule-list_wrapper">
          {meetups.length ? (
            meetups.map((meetup, key) => (
              <div className="meetup-wrapper" key={key}>
                <p className="meetup-date">
                  {new Date(meetup.date.seconds * 1000).getDate()}/
                  <span className="month">
                    {new Date(meetup.date.seconds * 1000).getMonth() + 1}
                  </span>
                </p>
                <div className="meetup-weather">
                  <p className="weather-wrapper">
                    {meetup.temp ? (
                      <>
                        <span className="weather"></span>
                        <span>{meetup.temp.max.toFixed(1)}°C</span>
                      </>
                    ) : (
                      <>
                        <Tooltip
                          arrow={true}
                          title="La temperatura se mostrará cuando falten 7 días o menos para el evento"
                        >
                          <span className="unavailable"></span>
                        </Tooltip>
                        <span className="alert"></span>
                      </>
                    )}
                  </p>
                </div>
                <p className="meetup-assistants">
                  <span className="people"></span>
                  {meetup.assistants.length}
                </p>
                <div>
                  <p className="meetup-name">{meetup.name}</p>
                  <p className="meetup-description">{meetup.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Aún no hay meetups agendadas.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default HomeAdmin;
