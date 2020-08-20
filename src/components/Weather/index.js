import React, { useState } from "react";

function Weather({ weather }) {
  return (
    <div className="Weather">El tiempo para este día será de {weather.max}</div>
  );
}

export default Weather;
