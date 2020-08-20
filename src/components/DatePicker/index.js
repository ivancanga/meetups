import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { es } from "date-fns/locale";

export default function BasicDatePicker({
  getWeatherApi,
  setMessage,
  setSelectedDate,
}) {
  const [selectedDate, handleDateChange] = useState(new Date());

  const now = new Date();
  const oneWeekFromNow = new Date().setDate(now.getDate() + 7);

  useEffect(() => {
    // Si la seleccion que esta en rango semanal (API limit) // refactor
    if (selectedDate.getTime() < oneWeekFromNow) {
      // Le paso como parametro el dia de la semana que selecciono para ver el clima
      getWeatherApi(selectedDate.getUTCDate() - new Date().getUTCDate());
    } else {
      setMessage(
        "Se mostrará el clima una semana antes de la fecha del meetup"
      );
      console.log(
        "Se mostrará el clima una semana antes de la fecha del meetup"
      );
    }
    // Seteo en componente principal la fecha seleccionada
    setSelectedDate(selectedDate);
  }, [selectedDate]);

  return (
    <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
      <DatePicker
        disableToolbar
        variant="static"
        value={selectedDate}
        onChange={handleDateChange}
        autoOk={true}
        disablePast={true}
        emptyLabel=""
      />
    </MuiPickersUtilsProvider>
  );
}
