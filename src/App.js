import React, { useState } from 'react';
import './index.scss';

const questions = [
  {
    title: 'React is a ... ?',
    variants: ['library', 'framework', 'application'],
    correct: 0,
  },
  {
    title: 'Component is ... ',
    variants: ['application', 'part of an app or page', "is that I don't know what it is"],
    correct: 1,
  },
  {
    title: 'What is JSX?',
    variants: [
      'It is a simple HTML',
      'Function',
      "It's the same HTML, but with the ability to execute JS code",
    ],
    correct: 2,
  },
];

function Result({ setStep }) {
  return (
    <div className="result">
      <img alt="congrats" src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>You guessed 3 out of 10 answers</h2>
      <button onClick={() => setStep(0)}>Try again</button>
    </div>
  );
}

function Game({ question, onClickVariant, step }) {
  const percentage = Math.round((step / questions.length) * 100);
  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((text, index) => (
          <li onClick={() => onClickVariant(index)} key={index}>
            {text}
          </li>
        ))}
      </ul>
    </>
  );
}

function App() {
  const [step, setStep] = useState(0);
  const question = questions[step];
  const onClickVariant = (index) => {
    console.log(step, index);
    setStep(step + 1);
  };
  return (
    <div className="App">
      {step !== questions.length ? (
        <Game step={step} onClickVariant={onClickVariant} question={question} />
      ) : (
        <Result setStep={setStep} />
      )}
    </div>
  );
}

export default App;
