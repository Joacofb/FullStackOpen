const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide all the arguments: node mongo.js <password> for a list of contacts in your phonebook or node mongo.js <password> <name> <number> for add a new contact')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
`mongodb+srv://joaquin:${password}@practicas.nc6osrj.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person
        .find({})
        .then(result => {
            console.log('phonebook:')
            result.forEach(person => {
                console.log(person.name, person.number)
            })
        mongoose.connection.close()
    })
} else {
    const person = new Person({
      name: name,
      number: number,
    })
    
    person
        .save()
        .then(result => {
            console.log(`${name} with phone numbner: ${number} was succesfully added to your phonebook.`)
            mongoose.connection.close()
        })
}

