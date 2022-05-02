/* eslint-disable no-undef */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://HowWhat:${password}@mernapp.dwstp.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('phonebook', personSchema)

const name = process.argv[3]
const number = process.argv[4]

const person = new Person({
  name,
  number
})

if (process.argv.length < 5) {
  console.log('phonebook:')
  Person.find({}).then((persons) => {
    persons.map((person) => console.log(person.name, person.number))
    mongoose.connection.close()
    process.exit(1)
  })
} else {
  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
    process.exit(1)
  })
}

