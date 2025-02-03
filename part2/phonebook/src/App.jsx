import { useState, useEffect } from 'react';
import numbersService from './services/numbers';

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

const Persons = ({ persons, searchPerson, removePerson }) => {
  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(searchPerson.toLowerCase())
  );
  return (
    <div>
      {personsToShow.map(person => 
        <div key={person.name}>
          {person.name} {person.number}
          <button onClick={() => removePerson(person.id, person.name)}>delete</button>
        </div>
      )}
    </div>
  );
};


const App = () => {
  const [persons, setPersons] = useState([]);  
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchPerson, setSearchPerson] = useState('');

  useEffect(() => {
    numbersService
      .getAll()
      .then(response => {
        setPersons(response);
      })
      .catch(error => {
        console.error('Error fetching persons:', error);
      });
  }, []);
  
  console.log('render', persons.length, 'persons');

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,  
        number: newNumber,
      };

      numbersService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          console.error('Error adding person:', error);
        });
    }
  };

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      numbersService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id));
      }).catch(error => {
        console.error('Error deleting person:', error);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchPerson={searchPerson} setSearchPerson={setSearchPerson} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} searchPerson={searchPerson} removePerson={removePerson}/>
    </div>
  );
};

export default App;