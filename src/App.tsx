import React, { useState } from 'react';

interface Person {
  name: string;
  availableDays: Set<number>;
}

function App() {
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  // TODO: дополнительный код
  return (
    <>
      helloWorld!
    </>
  );
}

export default App;
