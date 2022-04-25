const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')


const PORT = process.env.PORT || 3001
const app = express()
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :res[content-length] - :response-time ms :body'))

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use(express.static('build'))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/info', (req, res) => {
    const date = new Date()
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({ 
        error: 'content missing' 
        })
    }

    const isPerson = persons.find(person => person.name === body.name)
    if(isPerson) {
        return res.status(400).json({ 
        error: 'name must be unique' 
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 100000)
    }
    persons = persons.concat(person)
    res.json(person)
})