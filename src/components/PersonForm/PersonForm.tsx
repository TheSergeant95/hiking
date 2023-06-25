import React from 'react';

interface IPersonFormProps {
	name: string;
	error: string;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  }

const PersonForm: React.FC<IPersonFormProps> = ({ name, error, handleChange, handleSubmit }) => {
	return (
		<>
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="Введите имя" value={name} onChange={handleChange} />
				<button type="submit">Добавить</button>
			</form>
			<h3 className='error'>{error}</h3>
		</>
	);
  }
  
  export default PersonForm;