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
  const playerOneName =
    useSelector((state) => state.players.playerOneName) ||
    localStorage.getItem("playerOneName");
  const playerTwoName =
    useSelector((state) => state.players.playerTwoName) ||
    localStorage.getItem("playerTwoName");
  const playerOneScore = useSelector((state) => state.players.playerOneScore);
  const playerTwoScore = useSelector((state) => state.players.playerTwoScore);

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

  const playAgainHandler = () => {
    dispatch(playersActions.showHeading(true));
    dispatch(playersActions.resetScores());
    navigate("/", { replace: true });
  };

  return (
    <Row>
      <Col md={12}>
        <div className={classes.winnerContainer}>
          <div className={classes.heading}>
            <h2 className={classes.message}>Well Done!</h2>
            <h1 className={classes.winner}>{winner}</h1>
          </div>
          <img src="/img/Winner.svg" alt="Winner" />
          <div className={classes.results}>
            <div className={classes.firstPlaceContainer}>
              <img
                src="/img/Trophy.svg"
                className={classes.trophyImg}
                alt="Trophy"
              />
              <div className={classes.firstPlace}>
                <img
                  src="/img/Player_1.svg"
                  className={classes.scoreImg}
                  alt="Player 1"
                />
                <p>1st Place</p>
                <p>{winner}</p>
                <p>Score: {winningScore}</p>
              </div>
            </div>
            <div className={classes.secondPlace}>
              <img
                src="/img/Player_2.svg"
                className={classes.scoreImg}
                alt="Player 1"
              />
              <p>2nd Place</p>
              <p>{loser}</p>
              <p>Score: {losingScore}</p>
            </div>
          </div>
          <button className={classes.playBtn} onClick={playAgainHandler}>
            PLAY AGAIN
          </button>
        </div>
      </Col>
    </Row>
  );
};

export default Scores;
