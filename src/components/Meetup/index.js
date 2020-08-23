import React, { useState } from "react";

import calculateBirras from "../../services/birras";

import { Tooltip } from "@material-ui/core";

function Meetup({ meetup, dataUser, suscribeMeetup }) {
  const [loading, setLoading] = useState(false);

  const day = new Date(meetup.date.seconds * 1000).getDate();
  const month = new Date(meetup.date.seconds * 1000).getMonth() + 1;
  const assistants = meetup.assistants.length;
  let suscribed = false;

  if (meetup.temp)
    meetup.data = calculateBirras(meetup.temp.max.toFixed(1), assistants);

  meetup.assistants.forEach((e) => {
    if (e === dataUser.userId) suscribed = true;
  });

  return (
    <div className="meetup-wrapper">
      <p className="meetup-date">
        {day}/<span className="month">{month}</span>
      </p>
      <div className="meetup-weather">
        <p className="weather-wrapper" title="Clima">
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
      <p className="meetup-assistants" title="Asistentes">
        <span className="people"></span>
        {assistants}
      </p>
      <div className="meetup-data">
        <span className="note"></span>
        <span>
          <p className="meetup-name">{meetup.name}</p>
          <p className="meetup-description">{meetup.description}</p>
        </span>
      </div>

      {dataUser.admin ? (
        meetup.temp && meetup.assistants.length ? (
          <div className="meetup-birras">
            <span className="birras"></span>
            <span>
              Necesitás {meetup.data.birras} birras,
              <br /> encargá {meetup.data.cajon} cajon/es.
            </span>
          </div>
        ) : (
          <div className="meetup-birras">
            <span className="birras"></span> Aún no hay birras <br /> que
            comprar :(
          </div>
        )
      ) : !suscribed ? (
        <button
          className="suscribe"
          onClick={() => suscribeMeetup(meetup.uuid, setLoading)}
        >
          {loading ? <div className="loader"></div> : <span>Inscribirse</span>}
        </button>
      ) : (
        <span className="suscribed">
          <span className="checked"></span>
          Ya estas suscripto.
        </span>
      )}
    </div>
  );
}

export default Meetup;
