import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StatisticsLine = ({text, value}) => (
  <tbody>
    <tr>
      <th>{text}</th>
      <th>{value}</th>
    </tr>
  </tbody>
)

const Statistics = ({clicks}) => {
  console.log(clicks)

  const total = clicks.good + clicks.neutral + clicks.bad
  const average = (clicks.good * 1 + clicks.bad * -1) / total
  const positive = '% ' + (clicks.good * (100/total))

  if (total === 0) {
    return (
      <p>
        No feedback given!
      </p>
    )
  } else {
    return (
      <>
        <table>
          <StatisticsLine text='Good' value={clicks.good} />
          <StatisticsLine text='Neutral' value={clicks.neutral} />
          <StatisticsLine text='Bad' value={clicks.bad} />
          <StatisticsLine text='Total' value={total} />
          <StatisticsLine text='Average' value={average} />
          <StatisticsLine text='Positive' value={positive} />
        </table>
      </>
    )
  }
}

const Button = ({handle, text}) => (
    <button onClick={handle}>{text}</button>
  )


const App = () => {
  // save clicks of each button to its own state

  // const [good, setGood] = useState(0)
  // const [neutral, setNeutral] = useState(0)
  // const [bad, setBad] = useState(0)

  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const handleGoodClick = () => 
    setClicks({...clicks, good: clicks.good + 1})

  const handleNeutralClick = () => 
    setClicks({...clicks, neutral: clicks.neutral + 1})

  const handleBadClick = () => 
    setClicks({...clicks, bad: clicks.bad + 1})

  return (
    <>
      <div>
        <h3>Give FEEDBACK!</h3>
        <Button handle={handleGoodClick} text='GOOD' />
        <Button handle={handleNeutralClick} text='NEUTRAL' />
        <Button handle={handleBadClick} text='BAD' />
      </div>
      <div>
        <h3>Statistics</h3>
        <Statistics clicks={clicks}/>
      </div>
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)