import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const MaxVotedCuote = ({votes, anecdotes}) => {
  const maxVotes = Math.max(...votes)
  const maxVotesIndex = votes.indexOf(maxVotes)
  const anecdoteMaxVote = anecdotes[maxVotesIndex]

  if (maxVotes === 0) {
    return (
      <p>No votes yet! Please vote for one cuote.</p>
    )
  } else {
    return (
      <>
        <p>{anecdoteMaxVote}</p>
        <p>This cuote has {maxVotes} votes!</p>
      </>
    )
  }
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(6).fill(0))

  const handleNextClick = () => {
    const random = Math.floor(Math.random() * 6)
    setSelected(random)
  }

  const handleVotes = () => {
    const newVote = [...votes]
    newVote[selected] += 1
    setVotes(newVote)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]}
      </p>
      <p>
        This cuote has {votes[selected]} votes!
      </p>
      <button onClick={handleVotes}>Vote!</button>
      <button onClick={handleNextClick}>Next Anecdote</button>
      <h2>This is the most voted cuote!</h2>
      <MaxVotedCuote votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)