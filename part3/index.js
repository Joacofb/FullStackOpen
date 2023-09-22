const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

morgan.token('data', (req, res) => {
    return [
        req.method,
        req.url,
        JSON.stringify(req.body)
    ].join(' ')
})

app.use(morgan(':data'))

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-532353"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-23455"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-433331"
    },

]

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
}

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const date = new Date()
    res.send(`
        <h2>Your phonebook has info for ${persons.length} people.</h2>
        <h4>${date}</h4>
    `)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log(body)
    const name = body.name
    console.log(name)
    const names = persons.filter(p => p.name === name)

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing'
        })
    } else if (names.length > 0) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)

    res.json(person)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})