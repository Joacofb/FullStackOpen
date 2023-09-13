import React from 'react'

const Total = ({ parts }) => {
    const exercises = parts.map(part => part.exercises)

    const total = exercises.reduce((sum, part) => {
        console.log(sum, part)
        return sum + part
    })

    console.log(total)

    return <>
        <p>Total exercises: {total}</p>
    </>
}

export default Total