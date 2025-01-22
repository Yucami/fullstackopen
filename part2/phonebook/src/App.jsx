import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]); 
  const [newName, setNewName] = useState('');

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
      };

      setPersons(persons.concat(personObject));
      setNewName('');
    }
  };  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
            <input 
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => 
          <div key={person.name}>{person.name}</div>
        )}
      </div>
    </div>
  );
};

export default App;