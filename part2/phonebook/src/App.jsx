import { useState, useEffect } from 'react';
import Notification from './components/Notification';
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
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    numbersService
      .getAll()
      .then(response => {
        console.log("API response:", response);
        setPersons(response);  // Aquí no deberías acceder a response.data si ya lo haces en numbersService
      })
      .catch(error => {
        console.error('Error fetching persons:', error);
      });
  }, []);
  
  console.log('render', persons.length, 'persons');

  const addPerson = (event) => {
    event.preventDefault();
    
    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
     if (!newName || !newNumber) {
      alert('Both name and number are required!');
      return;
    }
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        console.log("Updating person:", updatedPerson); // Para depurar

        numbersService.update(existingPerson.id, updatedPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson));
          setNewName('');
          setNewNumber('');
          setMessage(`Updated ${returnedPerson.name}'s number`);
          setMessageType('success');
          setTimeout(() => {
            setMessage(null);
            setMessageType('');
          }, 5000);
        }).catch(error => {
          setMessage(`Error updating ${existingPerson.name}`);
          setMessageType('error');
          console.error('Error updating person:', error);
        });
      }
    } else {
      const personObject = {
        name: newName,  
        number: newNumber
      };

      numbersService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        setMessage(`Added ${returnedPerson.name}`);
        setMessageType('success');
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }).catch(error => {
        setMessage(`Error adding ${newName}`);
        setMessageType('error');
        console.error('Error adding person:', error);
      });
    }
  };

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      numbersService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id));
        setMessage(`Deleted ${name}`);
        setMessageType('success');
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }).catch(error => {
        setMessage(`Error deleting ${name}`);
        setMessageType('error');
        console.error('Error deleting person:', error);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter searchPerson={searchPerson} setSearchPerson={setSearchPerson} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} searchPerson={searchPerson} removePerson={removePerson}/>
    </div>
  );
};

export default App;