import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const Statistics = props => {
  const average = props.total === 0 ? 0 : (props.setGood - props.setBad) / props.total;
  const positivePercentage = props.total === 0 ? 0 : (props.setGood / props.total) * 100;
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.setGood} />
        <StatisticLine text="neutral" value={props.setNeutral} />
        <StatisticLine text="bad" value={props.setBad} />
        <StatisticLine text="all" value={props.total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positivePercentage.toFixed(2) + ' %'} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const totalComments = good + neutral + bad;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      {totalComments === 0 ? (
        <div>No feedback given</div>
      ) : (
        <div>
          <Statistics setGood={good} setNeutral={neutral} setBad={bad} total={totalComments} />
        </div>
      )}
    </div>
  )
}

export default App