import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cn from "classnames";
import s from "./MonthPicker.module.scss";
import ru from "date-fns/locale/ru";
registerLocale("ru", ru);

export const MonthPicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className={cn(s["month-picker"], "simple-text_main")}>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="MMMM yyyy"
        showMonthYearPicker
        showFullMonthYearPicker
        locale={ru}
      />
    </div>
  );
}