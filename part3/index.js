const app = require('./app') // la aplicación Express real
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

// require('dotenv').config()
// const express = require('express')
// const app = express()
// const cors = require('cors')
// const mongoose = require('mongoose')
// const Note = require('./models/note')

// // const password = process.argv[2]

// // const _url = `mongodb+srv://fullstackopen:${password}@cluster0.vvyub.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

// mongoose.set('strictQuery',false)

// app.use(express.static('dist'))

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }

// const errorHandler = (error, request, response, next) => {
//   console.error(error.message)

//   if (error.name === 'CastError') {
//     return response.status(400).send({ error: 'malformatted id' })
//   } else if (error.name === 'ValidationError') {
//     console.log('📌 Error de validación completo:', error)
//     return response.status(400).json({ error: error.message })
//   }

//   next(error)
// }

// app.use(cors())
// app.use(express.json())
// app.use(requestLogger)

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }

// app.get('/', (request, response) => {
//   response.send('<h1>Hello World!</h1>')
// })

// app.get('/api/notes', (request, response) => {
//   Note.find({}).then(notes => {
//     response.json(notes)
//   })
// })

// app.post('/api/notes', (request, response, next) => {
//   const body = request.body

//   const note = new Note({
//     content: body.content,
//     important: body.important || false
//   })

//   note.save()
//     .then(savedNote => {
//       response.json(savedNote)
//     })
//     .catch(error => next(error))
// })

// app.put('/api/notes/:id', (request, response, next) => {
//   const { content, important } = request.body

//   Note.findByIdAndUpdate(
//     request.params.id,
//     { content, important },
//     { new: true, runValidators: true, context: 'query' } // con new, la función devolverá el documento después de haber sido actualizado.
//   )
//     .then(updatedNote => {
//       response.json(updatedNote)
//     })
//     .catch(error => next(error))
// })

// app.get('/api/notes/:id', (request, response, next) => {
//   Note.findById(request.params.id)
//     .then(note => {
//       if (note) {
//         response.json(note)
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch(error => next(error))
// })

// app.delete('/api/notes/:id', (request, response, next) => {
//   Note.findByIdAndDelete(request.params.id)
//     .then(() => {
//       response.status(204).end()
//     })
//     .catch(error => next(error))
// })

// app.use(unknownEndpoint)

// app.use(errorHandler)

// const PORT = Number(process.env.PORT) || 3001
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })