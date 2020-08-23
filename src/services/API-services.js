const location = {
  buenosaires: "lat=-34.5780655&lon=-58.4265317",
  berlin: "lat=52.5065133&lon=13.1445545",
};

const api = {
  base: "https://api.openweathermap.org/data/2.5/onecall",
  location: location.buenosaires,
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
      let indexDay = 0;
      let timestamp = 0;
      meetups.forEach((i) => {
        timestamp = i.date.seconds * 1000;
        // If day is in range of 7 days (api limit) from now
        if (timestamp < oneWeekFromNow) {

          // Getting day number for obtain value from weather object index
          indexDay = new Date(timestamp).getUTCDate() - new Date().getUTCDate();

          // If index day is -1 (getUTCDate timezone), is actual day
          if(indexDay<0) indexDay = 0;
          
          // Destructuring weather of the day week number from now
          i.temp = data.daily[indexDay].temp;
        }
        meetupsWeather.push(i);
      });
      return meetupsWeather;
    });
  return weather;
};

export default getWeather;
