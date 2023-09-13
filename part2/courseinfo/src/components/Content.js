import React from 'react'
import Part from './Part'

const Content = ({parts}) => {

    return (
        <>
            {parts.map(part => <Part key={part.id} title={part.name} exercises={part.exercises} />)}
        </>
    )
}

export default Content