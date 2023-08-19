import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Parts = (props) => {
  console.log(props)
  return (
    <>
      <p>
        {props.parts[0].title}: {props.parts[0].exercises}
      </p>
      <p>
        {props.parts[1].title}: {props.parts[1].exercises}
      </p>
      <p>
        {props.parts[2].title}: {props.parts[2].exercises}
      </p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>
        Number of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
      </p>
    </>
  )
}

const App = () => {

  const course = {
    title: 'Half Stack application developments',
    parts: [
      {
        title: 'Fundamentals of React',
        exercises: 10
      },
      {
        title: 'Using props to pass data',
        exercises: 10
      },
      {
        title: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course.title} />
      <Parts parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))