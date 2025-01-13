import { useState } from 'react'

// const TotalComments = props => (
//   <div>
//     All {props.total}
//   </div>
// )

const Display = props => <div>{props.value} {props.text}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = props => {
  const average = props.total === 0 ? 0 : (props.setGood - props.setBad) / props.total;
  console.log('average', average, props);
  const positivePercentage = props.total === 0 ? 0 : (props.setGood / props.total) * 100;
  console.log('positivePercentage', positivePercentage, props); 
  return (
    <div>
      <div>Average {average}</div>
      <div>Positive {positivePercentage.toFixed(2)}%</div>
    </div>
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
          <Display value={good} text="good"/>
          <Display value={neutral} text="neutral"/>
          <Display value={bad} text="bad"/>
          <div>All {totalComments}</div>
          {/* <TotalComments total={totalComments}/> */}
          <Statistics setGood={good} setNeutral={neutral} setBad={bad} total={totalComments} />
        </div>
      )}
    </div>
  )
}

export default App