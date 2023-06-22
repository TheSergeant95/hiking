import React from 'react';

interface IPersonFormProps {
	name: string;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  }

const PersonForm: React.FC<IPersonFormProps> = ({ name, handleChange, handleSubmit }) => {
	return (
	  <form onSubmit={handleSubmit}>
		<input type="text" placeholder="Введите имя" value={name} onChange={handleChange} />
		<button type="submit">Добавить</button>
	  </form>
	);
  }
  
  export default PersonForm;