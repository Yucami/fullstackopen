require('dotenv').config()
const express = require('express')
const app = express()

const Note = require('./models/note')

const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://fullstackopen:${password}@cluster0.vvyub.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

let notes = [
  
]

app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(requestLogger)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
})
  
app.post('/api/notes', (request, response) => {
    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,    
    })

    note.save().then(savedNote => {
    response.json(savedNote)
    })
})

app.put('/api/notes/:id', (request, response, next) => {
    const { content, important } = request.body

    const updatedNote = { content, important }

    Note.findByIdAndUpdate(request.params.id, updatedNote, { new: true, runValidators: true })
        .then(updatedNote => {
            if (updatedNote) {
                response.json(updatedNote)
            } else {
                response.status(404).json({ error: 'Note not found' })
            }
        })
        .catch(error => next(error))
})

app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
      response.json(note)
    })
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
})

app.use(unknownEndpoint)

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})