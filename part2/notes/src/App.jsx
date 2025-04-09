import { useState, useEffect } from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import noteService from './services/notes';
import loginService from './services/login';

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    if (!note) return;

    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        console.error('Error updating note:', error);
        if (error.response && error.response.status === 404) {
          setErrorMessage(`Note '${note.content}' was already removed from server`);
          setNotes(notes.filter(n => n.id !== id));
        } else {
          setErrorMessage('An error occurred. Please try again.');
        }
        setTimeout(() => setErrorMessage(null), 5000);
      });
  };

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    };
  
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
        setMessage(`Added note: ${returnedNote.content}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch(error => {
        console.error('Error adding note:', error);
        setErrorMessage(error.response?.data?.error || 'Error adding note. Please try again.');

        setTimeout(() => setErrorMessage(null), 5000);
      });  
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }  

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>  
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={message || errorMessage} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          {noteForm()}   
        </div>   
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note 
            key={note.id} 
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange} 
        />
        <button type="submit">save</button>
      </form>
      <Footer />   
    </div>
  )
}

export default App
