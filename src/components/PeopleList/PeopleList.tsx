import { Person } from '../../App';
import DateButton from '../DateButton';
import closeIcon from '../../static/icon-close.svg';

interface IPersonFormProps {
	people: Person[];
	onDateChange: (index: number, date: Date[]) => void;
	handleRemovePerson: (index: number) => void;
  }

const PeopleList: React.FC<IPersonFormProps> = ({ people, onDateChange, handleRemovePerson }) => {
  return (
    <div className="peopleList">
      {people.map((person, index) => (
        <div className='peopleList__person' key={index}>
          <DateButton onSelect={(days) => onDateChange(index, days)} />
          <span> {person.name} </span>
          <button
            className='remove'
            onClick={() => handleRemovePerson(index)}
          >
            <img style={{width: '20px', height: '20px'}}src={closeIcon} alt={'Close'} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default PeopleList;