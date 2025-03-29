import React, { useState } from "react";
import "./Game.css";
import stone from "../assets/stone.png";
import paper from "../assets/paper.png";
import scissors from "../assets/scissors.png";

const choices = [
  { name: "Stone", img: stone },
  { name: "Paper", img: paper },
  { name: "Scissors", img: scissors },
];

const Game = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const playGame = (choice) => {
    if (gameOver) return;

    setUserChoice(choice);

    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * 3);
      const compChoice = choices[randomIndex];

      setComputerChoice(compChoice);

      let newResult = "";
      if (choice.name === compChoice.name) {
        newResult = "It's a Tie!";
      } else if (
        (choice.name === "Paper" && compChoice.name === "Stone") ||
        (choice.name === "Stone" && compChoice.name === "Scissors") ||
        (choice.name === "Scissors" && compChoice.name === "Paper")
      ) {
        newResult = "You Win!";
        setUserScore(userScore + 1);
      } else {
        newResult = "You Lose!";
        setComputerScore(computerScore + 1);
      }

      setResult(newResult);

      
      if (userScore + 1 === 2) {
        setGameOver(true);
        setResult("🎉 You Won the Round!");
      } else if (computerScore + 1 === 2) {
        setGameOver(true);
        setResult("💀 Computer Won the Round!");
      } else {
        setRound(round + 1);
      }
    }, 1000);
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult("");
    setUserScore(0);
    setComputerScore(0);
    setRound(1);
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <h1>Paper-Stone-Scissors</h1>
      <h2>Round {round} / 3</h2>

      <div className="choices">
        {choices.map((choice) => (
          <button key={choice.name} onClick={() => playGame(choice)}>
            <img src={choice.img} alt={choice.name} />
          </button>
        ))}
      </div>

      <div className="result">
        <p>You: {userChoice ? <img src={userChoice.img} alt="User" /> : "?"}</p>
        <p>Computer: {computerChoice ? <img src={computerChoice.img} alt="Computer" /> : "?"}</p>
        <h2>{result}</h2>
      </div>

      <h3>Score: You {userScore} - {computerScore} Computer</h3>

      {gameOver && <button className="reset-btn" onClick={resetGame}>Play Again</button>}
    </div>
  );
};

export default Game;
