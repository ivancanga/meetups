import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

export default function BasicDatePicker({ getWeatherApi }) {
  const [selectedDate, handleDateChange] = useState(new Date());

  useEffect(() => {
    getWeatherApi(selectedDate);
  }, [selectedDate]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        variant="inline"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </MuiPickersUtilsProvider>
  );
}
