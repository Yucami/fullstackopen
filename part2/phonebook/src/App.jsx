import { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({ searchPerson, setSearchPerson }) => {
  return (
    <div>
      filter shown with
      <input 
        value={searchPerson}
        onChange={(event) => setSearchPerson(event.target.value)}
        placeholder="Search by name"
      />
    </div>
  );
}

const PersonForm = ({ addPerson, newName, setNewName, newNumber, setNewNumber }) => {
  return (
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
  );
};

const Persons = ({ persons, searchPerson }) => {
  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(searchPerson.toLowerCase())
  );
  return (
    <div>
      {personsToShow.map(person => 
        <div key={person.name}>{person.name} {person.number}</div>
      )}
    </div>
  );
};


const App = () => {
  const [persons, setPersons] = useState([]);  
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchPerson, setSearchPerson] = useState('');

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])
  console.log('render', persons.length, 'persons')

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
      setNewNumber('');
    }
  }; 

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchPerson={searchPerson} setSearchPerson={setSearchPerson} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} searchPerson={searchPerson} />
    </div>
  );
};

export default App;