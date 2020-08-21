import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { es } from "date-fns/locale";

export default function BasicDatePicker({ setSelectedDate }) {
  const [selectedDate, handleDateChange] = useState(new Date());

  useEffect(() => {
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
