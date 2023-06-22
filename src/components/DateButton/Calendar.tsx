import React, { useEffect, useState } from "react";


interface ICalendarProps {
  selectedDates: Date[];
  currentMonth: number;
  currentYear: number;
  positionX: number;
  positionY: number;
  onSelect: (dates: Date) => void;
  nextMonth: () => void;
  prevMonth: () => void;
  cancel: () => void;
  showCalendar: (isVisible: boolean) => void;
}

const Calendar: React.FC<ICalendarProps> = ({ selectedDates, currentMonth, currentYear, positionX, positionY, onSelect, nextMonth, prevMonth, cancel, showCalendar }) => {
  
  
  const monthNames = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  const weekDays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

  const daysInMonth = Array.from({ length: new Date(currentYear, currentMonth + 1, 0).getDate() }, (_, i) => i + 1);
  
  const firstWeekDay = new Date(currentYear, currentMonth, 1).getDay();
  const blankDates = Array.from({ length: firstWeekDay}, (x: number) => x = 0);
  const totalDays = blankDates.concat(daysInMonth);

  const calendarLines = Array.from({ length: Math.ceil(totalDays.length / weekDays.length)}, (x: string) => x = '');

  
  return (
        <div className="modal" onClick={() => showCalendar(false)}>
          <div className="calendar" style={{top: positionY, left: positionX}} onClick={(e) => e.stopPropagation()}>
            <div className="header">
              <div className="previous-month" onClick={prevMonth}>
                {'<'}
              </div>
              <div className="current-month">
                {`${monthNames[currentMonth]} ${currentYear}`}
              </div>
              <div className="next-month" onClick={nextMonth}>
          {'>'}
              </div>
            </div>
            <table className="dates">
          <thead>
          <tr>
            {weekDays.map((weekDay) => (
              <th
                key={weekDay}
              >
                {weekDay}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarLines.map((line, lineIndex) => (
            <tr key={lineIndex}>
              {totalDays.map((day, dayIndex) => (
              dayIndex >= lineIndex*7 && dayIndex < (lineIndex + 1) * 7 ? 
                lineIndex === 0 && dayIndex < blankDates.length ? 
                <th key={dayIndex}/>
                :
                <th
                  key={dayIndex}
                  className={`day 
                  ${selectedDates.find(
                    (selectedDate) =>
                    selectedDate.getFullYear() === currentYear &&
                    selectedDate.getDate() === day &&
                    selectedDate.getMonth() === currentMonth
                  )
                    ? "selected"
                    : ""}`
                  }
                  onClick={() =>
                    onSelect(new Date(currentYear, currentMonth, day))
                  }
                >
                  {day}
                </th>
              : null
            ))}
            </tr>
          ))}
          </tbody>	
        </table>
        <div className="footer">
          <button onClick={cancel}>Очистить</button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
