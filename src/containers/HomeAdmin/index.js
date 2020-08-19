import React, { useState } from "react";
import DatePicker from "../../components/DatePicker";

import "./index.scss";

function HomeAdmin() {
  
  const getWeatherApi = (date) => {
    console.log("cambio la fecha", date);
  };

  return (
    <div className="Home">
      HomeAdmin
      <DatePicker getWeatherApi={getWeatherApi} />
    </div>
  );
}

export default HomeAdmin;
