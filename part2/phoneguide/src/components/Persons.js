import React from 'react'

const Persons = ({persons, allPersons, deletePerson, filter}) => {

    if (filter === '') {
        return (
            <ul className='person'>
                {allPersons.map(person => 
                    <li key={person.id}>{person.name} - {person.number} - <button onClick={() => deletePerson(person.id)}>Delete</button></li>
                )}
            </ul>
        )
    } else {
        return (
            <ul className='person'>
                {persons.map(person => 
                    <li key={person.id}>{person.name} - {person.number} - <button onClick={() => deletePerson(person.id)}>Delete</button></li>
                )}
            </ul>
        )
    }
    }

export default Persons