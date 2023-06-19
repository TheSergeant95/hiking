import React, { useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import DateButton from './DateButton';

interface Person {
  name: string;
  availableDays: Date;
}

function App() {
  const [people, setPeople] = useState<Person[]>([]);
  // const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [name, setName] = useState<string>("");

  const handleAddPerson = (name: string) => {
    const newPerson: Person = { name, availableDays: new Date() };
    setPeople([...people, newPerson]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAddPerson(name);
    setName("");
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onDateChange = (index: number, date: Date) => {
    const person = people[index];
    const availableDays = new Date(date);
    const newPeople = [...people];
    newPeople[index] = { ...person, availableDays };
    setPeople(newPeople);
  };

  const handleRemovePerson = (index: number) => {
    const updatedList = [...people.slice(0, index), ...people.slice(index + 1)]
    setPeople(updatedList);
  }

  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Введите имя" value={name} onChange={handleNameChange} />
        <button type="submit">Добавить</button>
      </form>

      {people.map((person, index) => (
        <div key={index}>
          {/* {[1, 2, 3].map((day) => (
            <button
              key={day}
              className={person.availableDays.has(day) ? 'selected' : ''}
              onClick={() => handleToggleDay(index, day)}
            >
              {day}
            </button>
          ))} */}
          <DateButton index={index} date={person.availableDays} onDateChange={() => onDateChange(index, person.availableDays)} />
          <span> {person.name} </span>
          {/* Todo: кнопки удаления */}
          <button
            onClick={() => handleRemovePerson(index)}
          >
            <RiCloseCircleLine />
          </button>
        </div>
      ))}

      {/* Todo: вывод совпадающих дат */}
      <hr />
      
    </div>
  );
}

export default App;
