import { useState } from 'react'

const Statistics = props => {
  const totalComments = props.setGood + props.setNeutral + props.setBad;
  const average = totalComments === 0 ? 0 : (props.setGood - props.setBad) / totalComments;
  const positivePercentage = totalComments === 0 ? 0 : (props.setGood / totalComments) * 100;

  return (
    <div>
      <div>Average {average}</div>
      <div>Positive {positivePercentage}%</div>

    </div>
  )
}

const TotalComments = props => (
  <div>
    All {props.setGood + props.setNeutral + props.setBad}
  </div>
)

const Display = props => <div>{props.value} {props.text}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Display value={good} text="good"/>
      <Display value={neutral} text="neutral"/>
      <Display value={bad} text="bad"/>
      <TotalComments setGood={good} setNeutral={neutral} setBad={bad}/> 
      <Statistics setGood={good} setNeutral={neutral} setBad={bad}/>
    </div>
  )
}

export default App