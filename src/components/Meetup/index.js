import React from "react";

import calculateBirras from "../../services/birras";

import { Tooltip } from "@material-ui/core";

function Meetup({ meetup, admin }) {
  const day = new Date(meetup.date.seconds * 1000).getDate();
  const month = new Date(meetup.date.seconds * 1000).getMonth() + 1;
  const assistants = meetup.assistants.length;

  if (meetup.temp)
    meetup.data = calculateBirras(meetup.temp.max.toFixed(1), assistants);

  return (
    <div className="meetup-wrapper">
      <p className="meetup-date">
        {day}/<span className="month">{month}</span>
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
        {assistants}
      </p>
      <div>
        <p className="meetup-name">{meetup.name}</p>
        <p className="meetup-description">{meetup.description}</p>
      </div>
      {admin &&
        (meetup.temp && meetup.assistants.length ? (
          <div>
            Necesitás {meetup.data.birras} birras, encargá {meetup.data.cajon}{" "}
            cajon/es.
          </div>
        ) : (
          <div>Aún no hay birras que comprar :(</div>
        ))}
    </div>
  );
}

export default Meetup;
