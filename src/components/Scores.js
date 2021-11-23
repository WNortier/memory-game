import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from "./Scores.module.css";
import { useNavigate } from "react-router-dom";
import { playersActions } from "../store/players-slice";
import { useSelector, useDispatch } from "react-redux";

const Scores = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let winner;
  let loser;
  let winningScore;
  let losingScore;
  const playerOneName = useSelector((state) => state.players.playerOneName);
  const playerTwoName = useSelector((state) => state.players.playerTwoName);
  const playerOneScore = useSelector((state) => state.players.playerOneScore);
  const playerTwoScore = useSelector((state) => state.players.playerTwoScore);
  console.log(playerOneScore);
  console.log(playerTwoScore);
  if (playerOneScore > playerTwoScore) {
    winningScore = playerOneScore;
    losingScore = playerTwoScore;
    winner = playerOneName;
    loser = playerTwoName;
  } else {
    winningScore = playerTwoScore;
    losingScore = playerOneScore;
    winner = playerTwoName;
    loser = playerOneName;
  }
  console.log(winner);

  const playAgainHandler = () => {
    dispatch(playersActions.resetScores());
    navigate("/", { replace: true });
  };

  return (
    <Row>
      <Col md={12}>
        <div className={classes.heading}>
          <h2>Well Done!</h2>
          <h1>{winner}</h1>
        </div>
        <div className={classes.results}>
          <div className={classes.firstPlace}>
            <p>1st Place</p>
            <p>{winner}</p>
            <p>Score: {winningScore}</p>
          </div>
          <div className={classes.secondPlace}>
            <p>2nd Place</p>
            <p>{loser}</p>
            <p>Score: {losingScore}</p>
          </div>
        </div>
        <button className={classes.playBtn} onClick={playAgainHandler}>
          PLAY AGAIN
        </button>
      </Col>
    </Row>
  );
};

export default Scores;
