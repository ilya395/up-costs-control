import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cn from "classnames";
import s from "./MonthPicker.module.scss";
import ru from "date-fns/locale/ru";
import { useDispatch, useSelector } from "react-redux";
import { choosedMonthAction } from "../../modules/month";
registerLocale("ru", ru);

export const MonthPicker = () => {

  const dispatch = useDispatch();

  const customDate = useSelector(state => state.date.choosedDate);

  return (
    <div className={cn(s["month-picker"], "simple-text_main")}>
      <DatePicker
        selected={customDate}
        onChange={(date) => dispatch(choosedMonthAction(date))}
        dateFormat="MMMM yyyy"
        showMonthYearPicker
        showFullMonthYearPicker
        locale={ru}
      />
    </div>
  );
}