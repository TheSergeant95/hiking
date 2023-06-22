import React from 'react';
import { Intersection } from '../../App';

interface IntersectionsListProps {
  intersections: Intersection[];
}

const IntersectionsList: React.FC<IntersectionsListProps> = ({ intersections }) => {
  return (
    <>
      {intersections.length > 0 ? (
		<div className='main-screen__footer'>
      	<h2>Пересечения дней:</h2>
        {intersections.map((intersection, index) => (
          <p key={index}>
            {intersection.dateRange} - {Array.from(intersection.peopleList).join(', ')}
          </p>
        ))}
		</div>
      ) : (
        <p>Нет совпадений</p>
      )}
	</>
  );
};

export default IntersectionsList;
