import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { es } from "date-fns/locale";

export default function BasicDatePicker({ setSelectedDate, selectedDate }) {
  
  const handleChange = (e) => {
    setSelectedDate(e);
  };

  return (
    <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
      <DatePicker
        disableToolbar
        variant="static"
        value={selectedDate}
        onChange={handleChange}
        autoOk={true}
        disablePast={true}
        emptyLabel=""
      />
    </MuiPickersUtilsProvider>
  );
}
