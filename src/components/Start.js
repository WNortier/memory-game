import React, { Fragment, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from "./Start.module.css";
import { useNavigate } from "react-router-dom";
import { playersActions } from "../store/players-slice";
import { useSelector, useDispatch } from "react-redux";

const Start = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerOneName = useSelector((state) => state.players.playerOneName);
  const playerTwoName = useSelector((state) => state.players.playerTwoName);
  const [playerOneTouched, setPlayerOneTouched] = useState(false);
  const [playerTwoTouched, setPlayerTwoTouched] = useState(false);

  const playerOneNameIsValid = playerOneName.trim().length > 0;
  const playerOneNameInputInvalid = !playerOneNameIsValid && playerOneTouched;

  const playerTwoNameIsValid = playerTwoName.trim().length > 0;
  const playerTwoNameInputInvalid = !playerTwoNameIsValid && playerTwoTouched;

  let inputsValid = false;

  if (playerOneNameIsValid && playerTwoNameIsValid) {
    inputsValid = true;
  }

  const playerOneBlurHandler = () => {
    setPlayerOneTouched(true);
  };

  const playerTwoBlurHandler = () => {
    setPlayerTwoTouched(true);
  };

  const playerOneNameHandler = (e) => {
    dispatch(playersActions.setPlayerOneName(e.target.value));
  };

  const playerTwoNameHandler = (e) => {
    dispatch(playersActions.setPlayerTwoName(e.target.value));
  };

  const newGameHandler = () => {
    localStorage.setItem("playerOneName", playerOneName);
    localStorage.setItem("playerTwoName", playerTwoName);
    navigate("/game", { replace: true });
    dispatch(playersActions.setIsPlaying(true));
    dispatch(playersActions.showHeading(true));
    localStorage.setItem("showHeading", true);
    localStorage.setItem("isPlaying", true);
  };

  return (
    <Fragment>
      <div className={classes.heading}>
        <h1>Are you ready to play?</h1>
      </div>
      <Row>
        <div className={classes.startContainer}>
          <Col md={3}>
            <div className={classes.playerOne}>
              <div>
                <img
                  src="/img/Player_1.svg"
                  className={classes.playerOneImg}
                  alt="Player 1"
                />
              </div>
              <input
                type="text"
                onChange={playerOneNameHandler}
                onBlur={playerOneBlurHandler}
                placeholder="Name of Player 1"
              ></input>
              {playerOneNameInputInvalid && (
                <p className={classes.error}>Name may not be empty</p>
              )}
            </div>
          </Col>
          <Col md={3}>
            <div className={classes.playerTwo}>
              <div>
                <img
                  src="/img/Player_2.svg"
                  className={classes.playerTwoImg}
                  alt="Player 2"
                />
              </div>
              <input
                type="text"
                onChange={playerTwoNameHandler}
                onBlur={playerTwoBlurHandler}
                placeholder="Name of Player 2"
              ></input>
              {playerTwoNameInputInvalid && (
                <p className={classes.error}>Name may not be empty</p>
              )}
            </div>
          </Col>
        </div>
        <div>
          {" "}
          <button
            disabled={!inputsValid}
            className={classes.startBtn}
            onClick={newGameHandler}
          >
            Let's Play
          </button>{" "}
        </div>
      </Row>
    </Fragment>
  );
};

export default Start;
