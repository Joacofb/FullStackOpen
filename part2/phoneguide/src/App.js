import React, { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Message from './components/Message';
import Footer from './components/Footer'

const App = () => {
  const [ allPersons, setAllPersons ] = useState([])
  const [ persons, setPersons ] = useState([])
  const [ name, setName ] = useState('')
  const [ number, setNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ className, setClassName ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
      setAllPersons(initialPersons)
    })
  }, [])
  

  const addName = (e) => {
    e.preventDefault()

    const person = allPersons.find(person => person.name === name)
    const personToAdd = person
    // personToAdd is the old object with the old information, it is filtered by name, not to repeat a contact.
    console.log(personToAdd)

    const personToUpdate = { ...personToAdd, number: number }
    // personToUpdate is the old object but with the new number, so we can update the contact.
    console.log(personToUpdate)


    if (person) {
      window.confirm(`${personToAdd.name}, with phone number: ${personToAdd.number} already exists! Do you want to update phone number?`)
      console.log(personToUpdate.name, 'is going to be updated with the number', personToUpdate.number)
      personService
        .update(personToUpdate.id, personToUpdate)
        .then(returnedObject => {
          setAllPersons(allPersons.map(p => p.id !== personToAdd.id ? p : returnedObject))
          console.log(`${personToUpdate.name} was successfully updated.`)
          setName('')
          setNumber('')
          setClassName('success')
          setMessage(`${personToUpdate.name} was successfully updated.`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(`the person '${personToUpdate.name}' was already deleted from server`, error)
          setClassName('error')
          setMessage(`the person '${personToUpdate.name}' was already deleted from server`)
          setTimeout(() => {
            setMessage(null)
            setAllPersons(allPersons.filter(p => p.id !== personToUpdate.id))
          }, 5000)
        })
    } else {
      console.log('You are going to add a new contact, with name: ', name, ' and number: ', number)
      const newPersonObject = { name, number }
      personService
        .create(newPersonObject)
        .then(returnedPerson => {
          setAllPersons(allPersons.concat(returnedPerson))
          console.log(`${newPersonObject.name} was successfully added to your phonebook`)
          setName('')
          setNumber('')
          setClassName('success')
          setMessage(`${newPersonObject.name} was successfully added to your phonebook`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

const deletePerson = (id) => {
  console.log(id)
  const filteredPerson = allPersons.filter(person => (person.id === id))
  console.log(filteredPerson)
  const personId = filteredPerson[0].id
  const personName = filteredPerson[0].name
  console.log(personId)
  console.log(personName)

  if (window.confirm(`Delete ${personName} with number ID ${personId} ?`)) {
      console.log(personName, 'is going to be deleted')
      personService
          .remove(personId)
          .then(setAllPersons(allPersons.filter(person => (person.id !== personId))))
          .catch(error => {
              console.log(error)
              setClassName('error')
              setMessage(`the person '${personName}' was already deleted from server`)
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            })
  }
}  

  const handleNameChange = (e) => {
    console.log(e.target.value)
    setName(e.target.value)
  }
  const handleNumberChange = (e) => {
    console.log(e.target.value)
    setNumber(e.target.value)
  }
  const handleFilterChange = (e) => {
    setFilter(e.target.value)
    const filteredPersons = allPersons.filter(person => person.name.toLowerCase().includes(filter))
    console.log(filteredPersons)
    setPersons(filteredPersons)
  }

  return (
    <div>
      <h1>PHONEBOOK - by Giorgio -</h1>
      <Message 
        message={message}
        className={className}/>
      <Filter 
        value={filter}
        onChange={handleFilterChange}/>
      <h2>Add New Contact</h2>
      <PersonForm 
        onSubmit={addName}
        name={name}
        nameChange={handleNameChange}
        number={number}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>     
      <Persons
        filter={filter}
        persons={persons} 
        allPersons={allPersons} 
        setAllPersons={setAllPersons}
        deletePerson={deletePerson}
      />
      <Footer />
    </div>
  )
}

export default App
