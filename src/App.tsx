import React, { useEffect, useState } from 'react';
import PersonForm from './components/PersonForm';
import PeopleList from './components/PeopleList';
import IntersectionsList from './components/IntersectionsList/IntersectionsList';

export interface Person {
  name: string;
  availableDays: Date[];
}
export interface Intersection {
  dateRange: string; 
  peopleList: Set<string> 
}

function App() {
  const [people, setPeople] = useState<Person[]>([]);
  const [name, setName] = useState<string>("");
  const [intersections, setIntersections] = useState<Intersection[]>([]);

  const handleAddPerson = (name: string) => {
    const newPerson: Person = { name, availableDays: [new Date()] };
    setPeople([...people, newPerson]);
  };

  const handleSubmitPerson = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAddPerson(name);
    setName("");
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onDateChange = (index: number, date: Date[]) => {
    setPeople(prevPeople => {
      const updatedPeople = prevPeople.map((person, i) => {
        if (i === index) {
          return {
            ...person,
            availableDays: [...date]
          };
        }
        return person;
      });
      return updatedPeople;
    });
  };

  const handleRemovePerson = (index: number) => {
    const updatedList = [...people.slice(0, index), ...people.slice(index + 1)]
    setPeople(updatedList);
  }

  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };

  const datesArrayToString = (dates: Date[]): string => {
    const dateString = dates.map((date) => date.toLocaleDateString('ru-RU', options));
    return dateString[0] + ' - ' + dateString[dateString.length - 1];
  }
  const findConsecutiveDates = (dates: Set<Date>): Set<Set<Date>> => {
    const result = new Set<Set<Date>>();
  
    const sortedDates = Array.from(dates).sort((a, b) => a.getTime() - b.getTime());
    for (let i = 0; i < sortedDates.length - 2; i++) {
      const date1 = sortedDates[i];
      const date2 = sortedDates[i + 1];
      const date3 = sortedDates[i + 2];
  
      if (
        date1.getTime() + 24 * 60 * 60 * 1000 === date2.getTime() &&
        date2.getTime() + 24 * 60 * 60 * 1000 === date3.getTime()
      ) {

        const group = new Set<Date>();
        group.add(date1);
        group.add(date2);
        group.add(date3);
        result.add(group);
      }
    }
  
    return result;
  }
  useEffect(() => {
    const getIntersections = () => {
      const intersections = people.reduce((acc, person, index) => {
        for (let i = index + 1; i < people.length; i++) {
          const otherPerson = people[i];
          const intersection = new Set(
            person.availableDays.filter((day) =>
              otherPerson.availableDays.some(
                (otherDay) => otherDay.getDate() === day.getDate()
              )
            )
          );
          const processedIntersection = findConsecutiveDates(intersection);
          for (let value of processedIntersection) {
            acc.push({
              days: value,
              people: [person.name, otherPerson.name],
            });
          };
        }
        return acc;
      }, [] as { days: Set<Date>; people: string[] }[]);

      return intersections.sort((a, b) => b.people.length - a.people.length)
        .reduce((acc, intersection) => {
          const dateRange = datesArrayToString(Array.from(intersection.days));
          const existingEntry = acc.find(entry => entry.dateRange === dateRange);
          if (existingEntry) {
            intersection.people.forEach((entry) => {
              existingEntry.peopleList.add(entry);
            })
          } else {
            const peopleList = new Set(intersection.people);
            acc.push({ dateRange, peopleList: peopleList });
          }
        return acc;
      }, [] as { dateRange: string, peopleList: Set<string> }[]).sort((a, b) => b.peopleList.size - a.peopleList.size);
    };

    const intersections = getIntersections();
    setIntersections(intersections);
  }, [people]);
  
  return (
    <div className='main-screen'>
      <div className='main-screen__content'>
        <PersonForm 
          name={name}
          handleChange={handleNameChange}
          handleSubmit={handleSubmitPerson} 
        />
        <PeopleList
          people={people}
          onDateChange={onDateChange}
          handleRemovePerson={handleRemovePerson}
        />
        <div className='line' />
        <IntersectionsList intersections={intersections} />
      </div>
    </div>
  );
}

export default App;
