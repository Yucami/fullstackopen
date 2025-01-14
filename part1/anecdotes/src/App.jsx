import { useState } from 'react';

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
);

const handleClick = (anecdotes, setSelected) => {
  const randomIndex = Math.floor(Math.random() * anecdotes.length);
  setSelected(randomIndex);
};

const handleVote = (selected, votes, setVotes) => {
  const copy = [...votes];
  copy[selected] += 1;
  setVotes(copy);
  console.log('votos', copy);
};

const getMaxVotesIndex = (votes) => {
  return votes.reduce((maxIndex, currentVotes, currentIndex, array) => {
    return currentVotes > array[maxIndex] ? currentIndex : maxIndex
  }, 0);
}; 

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const mostVotedIndex = getMaxVotesIndex(votes);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>has {votes[selected]} votes</div>
      <Button handleClick={() => handleVote(selected, votes, setVotes)} text="Vote" />
      <Button handleClick={() => handleClick(anecdotes, setSelected)} text="Next anecdote" />
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[mostVotedIndex]}</div>
      <div>Has {votes[mostVotedIndex]} votes</div>
    </div>
  );
};

export default App;