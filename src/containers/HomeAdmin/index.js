import React, { useState, useEffect } from "react";
import DatePicker from "../../components/DatePicker";
import Weather from "../../components/Weather";

import firebase from "../../config/firebase";

import "./index.scss";

function HomeAdmin() {
  const [loading, setLoading] = useState();
  const [weather, setWeather] = useState({});
  const [selectedDate, setSelectedDate] = useState();
  const [message, setMessage] = useState();

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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(!loading);
  }, [weather, message]);

  // Refactor variables en .env
  const api = {
    base: "https://api.openweathermap.org/data/2.5/onecall",
    location: "lat=-34.5780655&lon=-58.4265317",
    key: "967884c26af641b5f50d89fe95b68545",
  };

  const getWeatherApi = (day) => {
    setLoading(true);
    fetch(
      `${api.base}?APPID=${api.key}&${api.location}&units=metric&exclude=current,minutely,hourly`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.daily[day].temp);
        setWeather(data.daily[day].temp);
      });
  };

  return (
    <>
      <div className="Home schedule-admin">
        <div className="schedule-admin_title">
          <h4>Agendar nueva meetup, Buenos Aires</h4>
        </div>
        <div className="schedule-admin_wrapper">
          <div className="schedule wrapper">
            <p className="schedule_title icon">
              Elegí una fecha para el evento
            </p>
            <DatePicker
              getWeatherApi={getWeatherApi}
              setMessage={setMessage}
              setSelectedDate={setSelectedDate}
            />
          </div>

          <div className="weather wrapper">
            <p className="weather_title icon">Mirá como va a estar el clima</p>
            {loading ? <div>Cargando...</div> : <Weather weather={weather} />}
            {message && <div>{message}</div>}
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
              Agendar meetup
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default HomeAdmin;
