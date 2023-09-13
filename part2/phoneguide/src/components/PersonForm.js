import React from 'react'

const PersonForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <div>
            Name: <input 
                value={props.name}
                onChange={props.nameChange}
                />
                <br />
            Phone Num: <input 
                value={props.number}
                onChange={props.handleNumberChange}
            />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default PersonForm