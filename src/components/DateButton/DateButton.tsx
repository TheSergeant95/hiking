import React, { useEffect, useState } from "react";
import calendarIcon from '../../static/icon-calendar.svg'
import "./calendar.scss";
import Calendar from "./Calendar";

interface IDateButtonProps {
	onSelect: (dates: Date[]) => void;
  }
  
  const DateButton: React.FC<IDateButtonProps> = ({ onSelect }) => {
	const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const [showCalendar, setShowCalendar] = useState(false);
	const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		onSelect(selectedDates);
	}, [selectedDates]);
	
	const handleOpenCalendar = (event: React.MouseEvent<HTMLButtonElement>) => {
		setShowCalendar(true);
		setButtonPosition({ x: event.clientX - 154, y: event.clientY + 20 });
	}

	const handleDateClick = (date: Date) => {
	  setSelectedDates(prevSelectedDates => {
		const index = prevSelectedDates.findIndex(
		  (selectedDate) =>
		  selectedDate.getFullYear() === date.getFullYear() &&
		  selectedDate.getMonth() === date.getMonth() &&
		  selectedDate.getDate() === date.getDate()
		);
		if (index >= 0) {
		  return [
		  ...prevSelectedDates.slice(0, index),
		  ...prevSelectedDates.slice(index + 1),
		  ];
		} else {
		  return [...prevSelectedDates, date];
		}
		});
	  
	  onSelect(selectedDates);
	};
  
	const handleCancelClick = () => {
	  setSelectedDates([]);
	  onSelect([]);
	  setShowCalendar(false);
	};
  
	const handlePrevMonthClick = () => {
	  setCurrentMonth((prevMonth) => {
		let newMonth = prevMonth - 1;
		let newYear = currentYear;
		if (newMonth < 0) {
		  newMonth = 11;
		  newYear--;
		}
		setCurrentYear(newYear);
		return newMonth;
	  });
	};
  
	const handleNextMonthClick = () => {
	  setCurrentMonth((prevMonth) => {
		let newMonth = prevMonth + 1;
		let newYear = currentYear;
		if (newMonth > 11) {
		  newMonth = 0;
		  newYear++;
		}
		setCurrentYear(newYear);
		return newMonth;
	  });
	};

	return (
		<>
			<button className='calendar-switch' onClick={handleOpenCalendar}>
				<img style={{width: '20px', height: '20px'}}src={calendarIcon} alt={'Pick a date'} />
			</button>
      		{showCalendar && 
			<Calendar
				selectedDates={selectedDates}
				currentMonth={currentMonth}
				currentYear={currentYear}
				positionX={buttonPosition.x} 
				positionY={buttonPosition.y}
				onSelect={handleDateClick} 
				showCalendar={(isVisible) => setShowCalendar(isVisible)} 
				nextMonth={handleNextMonthClick}
				prevMonth={handlePrevMonthClick}
				cancel={handleCancelClick}
			/>}
		</>
	)
  }

  export default DateButton;