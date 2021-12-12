import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import s from "./CostForm.module.scss";
import ru from "date-fns/locale/ru";
import cn from "classnames";
import { useSelector } from "react-redux";
registerLocale("ru", ru);

export const CostFormView = ({props, onCancel, onSave, disabled}) => {

  const [disableNumberField, setDisableNumberField] = useState(false);

  const [amount, setAmount] = useState("");

  const [description, setDescription] = useState("");

  const customDate = useSelector(state => state.date.choosedDate);
  const [localDate, setLocalDate] = useState(customDate);

  const [dateVisible, setDateVisible] = useState(false);

  const onChangeAmount = event => {
    const amount = event.target.value;
    if (Number(+amount)) {
      setAmount(event.target.value);
      setDisableNumberField(false);
      return;
    }
    setDisableNumberField(true);
  }

  const onChangeDescription = event => {
    return setDescription(event.target.value);
  }

  const onCancelCost = () => {
    return onCancel && onCancel();
  }

  const onSaveCost = event => {
    event.preventDefault();
    const data = {
      amount,
      description,
      // date: localDate,
      expenseItemId: props.expenseItemId,
    };
    dateVisible ? (data.date = localDate) : data;
    return onSave && onSave(data);
  }

  return (
    <>
      <div className="simple-form__outer-wrapper">
        <h2>
          Добавить расход в категорию “{props.name}”
        </h2>
        <form className="simple-form">
          <div className="simple-form__form-field simple-form__form-field_row">
            <label htmlFor="amount" className="simple-text_main">
              Сумма, руб:
            </label>
            <input
              type="text"
              className="simple-form__input simple-text_main"
              id="amount"
              name="amount"
              value={amount}
              onChange={onChangeAmount}
              required={true}
            />
          </div>
          <div className="simple-form__form-field simple-form__form-field_row">
            <label htmlFor="description" className="simple-text_main">
              Описание:
            </label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="5"
              className="simple-form__input simple-text_main"
              value={description}
              onChange={onChangeDescription}
            ></textarea>
          </div>
          <div className="simple-form__form-field simple-form__form-field_row">
            <label htmlFor="date" className="simple-text_main">
              Дата:
            </label>
            <div className={cn(s["month-picker"], "simple-text_main")}>
              {
                dateVisible ?
                <DatePicker
                  selected={localDate}
                  onChange={(date) => setLocalDate(date)}
                  dateFormat="MMMM yyyy"
                  showMonthYearPicker
                  showFullMonthYearPicker
                  locale={ru}
                /> :
                <span onClick={() => setDateVisible(true)}>сегодня</span>
              }

            </div>
          </div>
          <div className="simple-form__buttons-block">
            <button
              className="little-button_opacity simple-title_other"
              onClick={onCancelCost}
            >
              Отмена
            </button>
            <button
              className="little-button simple-title_other"
              onClick={onSaveCost}
              disabled={disabled || disableNumberField}
            >
              Готово
            </button>
          </div>
        </form>
      </div>
    </>
  );
}