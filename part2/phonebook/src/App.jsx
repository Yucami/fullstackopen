import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 } 
  ]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchPerson, setSearchPerson] = useState('');

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber(persons.concat(personObject));
      setNewNumber('');
    }
  }; 

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(searchPerson.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
          <input 
            value={searchPerson}
            onChange={(event) => setSearchPerson(event.target.value)}
            placeholder="Search by name"
          />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
            <input 
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
            />
        </div>
        <div>
          number: 
            <input 
              value={newNumber}
              onChange={(event) => setNewNumber(event.target.value)}
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person => 
          <div key={person.name}>{person.name} {person.number}</div>
        )}
      </div>
    </div>
  );
};

export default App;