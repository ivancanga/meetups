import React, { useState, useEffect } from "react";

import DatePicker from "../../components/DatePicker";
import Meetup from "../../components/Meetup";

import firebaseServices from "../../services/firebase-services";

import "./index.scss";

function HomeAdmin() {
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    firebaseServices.getMeetups(setMeetups);
  }, []);

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
    setLoading(!loading);
    form.date = selectedDate;
    form.assistants = [];
    firebaseServices
      .createMeetup(form)
      .then(() => {
        firebaseServices.getMeetups(setMeetups);
        setLoading(loading);
        setForm(dataForm);
        setStatus({
          message:
            "Meetup agendada con éxito. El clima se mostrará una semana antes de la fecha del evento.",
        });
        setTimeout(() => {
          setStatus({});
        }, 3500);
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
            <DatePicker
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
            />
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
          {status.message && <p className="message">{status.message}</p>}
        </div>
      </div>

      <div className="schedule-list Home">
        <div className="schedule-list_title">
          <h4>Meetups agendadas</h4>
          <p
            title="Refrescar meetups"
            className="refresh"
            onClick={() => firebaseServices.getMeetups(setMeetups)}
          ></p>
        </div>
        <div className="schedule-list_wrapper">
          {meetups.length ? (
            meetups.map((meetup, key) => (
              <Meetup meetup={meetup} key={key} admin={true} />
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
