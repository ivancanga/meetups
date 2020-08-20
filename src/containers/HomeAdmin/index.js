import React, { useState } from "react";
import DatePicker from "../../components/DatePicker";

import "./index.scss";

function HomeAdmin() {
  const [loading, setLoading] = useState(false);

  // Refactor variables en .env
  const api = {
    base: "https://api.openweathermap.org/data/2.5/onecall",
    location: "lat=-34.5780655&lon=-58.4265317",
    key: "967884c26af641b5f50d89fe95b68545",
  };

  const getWeatherApi = (day) => {
    fetch(
      `${api.base}?APPID=${api.key}&${api.location}&units=metric&exclude=current,minutely,hourly`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.daily[day].temp);
        setLoading(!loading);
      });
  };

  return (
    <div className="Home">
      HomeAdmin
      <DatePicker getWeatherApi={getWeatherApi} />
      
    </div>
  );
}

export default HomeAdmin;
