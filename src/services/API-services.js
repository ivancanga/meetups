const location = {
  buenosaires: "lat=-34.5780655&lon=-58.4265317",
  berlin: "lat=52.5065133&lon=13.1445545",
};

const api = {
  base: "https://api.openweathermap.org/data/2.5/onecall",
  location: location.berlin,
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
        // If day is in range of 7 days (api limit) until now
        if (timestamp < oneWeekFromNow) {
          // Getting day number for obtain value from weather object index
          let day = new Date(timestamp).getUTCDate() - new Date().getUTCDate();
          i.temp = data.daily[day].temp;
        }
        meetupsWeather.push(i);
      });
      return meetupsWeather;
    });
  return weather;
};

export default getWeather;
