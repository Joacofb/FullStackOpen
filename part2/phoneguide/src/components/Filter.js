import React from 'react'

const Filter = ({value, onChange}) => {
  return (
    <>
        Search: <input 
        value={value}
        onChange={onChange}
        />
    </>
  )
}

export default Filter