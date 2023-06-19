import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import "./styles.css";

interface DateButtonProps {
	index: number;
	date: Date
	onDateChange: (index: number, date: Date) => void;
}

const DateButton: React.FC<DateButtonProps> = ({index, date, onDateChange}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [indexState, setIndexState] = useState(0);
  const [datePickerIsOpen, setDatePickerIsOpen] = useState(false);

  useEffect(() => {
	setStartDate(date);
	setIndexState(index);
  }, [])

  const handleChange = (date: Date) => {
    setStartDate(date);
	onDateChange(indexState, startDate);
  }

  const openDatePicker = () => {
    setDatePickerIsOpen(!datePickerIsOpen);
  };

  return (
    <div>
      <button onClick={openDatePicker}>openDate</button>
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        onClickOutside={openDatePicker}
        open={datePickerIsOpen}
      />
    </div>
  );
}

export default DateButton;
