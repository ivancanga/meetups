import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

export default function BasicDatePicker({ getWeatherApi }) {
  const [selectedDate, handleDateChange] = useState(new Date());

  const now = new Date();
  const oneWeekFromNow = new Date().setDate(now.getDate() + 7);

  useEffect(() => {
    // Si la seleccion que esta en rango semanal (API limit) // refactor
    if (selectedDate.getTime() < oneWeekFromNow) {
      // Le paso como parametro el dia de la semana que selecciono para ver el clima
      getWeatherApi(selectedDate.getUTCDate() - new Date().getUTCDate());
    } else {
      console.log(
        "Se mostrará el clima una semana antes de la fecha del meetup"
      );
    }
  }, [selectedDate]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        disableToolbar
        variant="inline"
        value={selectedDate}
        onChange={handleDateChange}
        autoOk={true}
        disablePast={true}
      />
    </MuiPickersUtilsProvider>
  );
}
